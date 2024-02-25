import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { EmailService } from 'src/modules/email/email.service';
import { ChangePasswordUser, CreateUserDto, DataOrder, LoginUserDto, UpdateInfoUser } from '../dto/user.dto';
import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly emailService: EmailService,
        private readonly jwtService: JwtService
    ) {}

    async createUser(userDto: CreateUserDto) {
        userDto.password = await bcrypt.hash(userDto.password, 10);
        const userInDb = await this.userRepository.findByCondition({
            email: userDto.email
        });
        if (userInDb) {
            throw new HttpException('Email already used to register', HttpStatus.BAD_REQUEST);
        }
        return await this.userRepository.create(userDto);
    }

    findByLogin = async ({ email, password }: LoginUserDto) => {
        const user = (await this.userRepository.findByCondition({
            email: email
        })) as User;
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }
        const is_equal = bcrypt.compareSync(password, user.password);
        if (!is_equal || user.isBlocked) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        return user;
    };

    findByEmail = async (email: string) => {
        return await this.userRepository.findByCondition({
            email: email
        });
    };

    update = async (filter: any, update: any) => {
        if (update.refreshToken) {
            update.refreshToken = await bcrypt.hash(this.reverse(update.refreshToken), 10);
        }

        return await this.userRepository.findByConditionAndUpdate(filter, update);
    };

    getUserByRefresh = async (refresh_token: string, email: string) => {
        const user = await this.findByEmail(email);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        // const is_equal = await bcrypt.compareSync(refresh_token, user.refreshToken);
        const is_equal = await bcrypt.compare(this.reverse(refresh_token), user.refreshToken);

        console.log(is_equal);
        if (!is_equal) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        return user;
    };

    getAllUser = async (page: number, limit: number) => {
        try {
            const count = await this.userRepository.countDocuments({});
            const count_page = Math.ceil(count / limit);
            const data = await this.userRepository.getByCondition(
                {
                    role: 1111
                },
                null,
                {
                    sort: { createdAt: -1 },
                    skip: (page - 1) * limit,
                    limit: Number(limit)
                }
            );
            return {
                data,
                current_page: page,
                count_page
            };
        } catch (error) {
            throw new Error(error.message);
        }
    };

    blockUserID = async (userID: string, block: boolean) => {
        try {
            const user = await this.userRepository.findById(userID);
            if (!user) throw new Error('User not found');
            user.isBlocked = block;
            await user.save();
            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    deleteMultipleUsers = async (userIDs: string[]) => {
        try {
            const validUserIDs = userIDs.filter((userID) => Types.ObjectId.isValid(userID));
            if (!validUserIDs) throw new Error('Invalid user IDs');
            await this.userRepository.deleteMany(validUserIDs);
            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    updateCartUser = async (userID: string, data: DataOrder) => {
        try {
            const { id, color, quantity, add } = data;
            if (!id) throw new Error('Missing input update cart user');
            if (!quantity) {
                const response = await this.userRepository.updateOne(
                    { _id: userID, color: color },
                    { $pull: { cart: { product: id } } }
                );
                return response ? true : false;
            }
            const user = await this.userRepository.findById(userID); // find user
            const alreadyProduct = user.cart.find((item) => item.product.toString() === id && item.color === color); // find product in cart

            if (alreadyProduct) {
                const updateQuantity = add ? quantity : -1;
                const res = await this.userRepository.updateOne(
                    { _id: userID, cart: { $elemMatch: alreadyProduct } },
                    { $inc: { 'cart.$.quantity': updateQuantity } },
                    { new: true }
                );
                return res ? true : false;
            } else {
                const response = await this.userRepository.findByIdAndUpdate(userID, {
                    $push: { cart: { product: id, quantity, color } }
                });
                return response ? true : false;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };

    resetCart = async (userID: string) => {
        try {
            const user = await this.userRepository.findByIdAndUpdate(userID, { cart: [] });
            if (!user) throw new Error('Reset cart warnning');
            return true;
        } catch (err) {
            console.log(err);
        }
    };

    getCart = async (userID: string) => {
        try {
            const user = await this.userRepository.findByCondition({ _id: userID }, null, null, {
                path: 'cart.product',
                select: 'title price thumb'
            });
            if (!user) throw new Error('Chưa lấy được cart');
            return user.cart;
        } catch (err) {
            console.log(err);
        }
    };

    updateInfoUser = async (userID: string, data: UpdateInfoUser) => {
        try {
            const user = await this.userRepository.findById(userID);
            if (!user) throw new Error('Không tìm thấy user để cập nhật');
            if (data.name) {
                user.name = data.name;
            }
            if (data.mobile) {
                user.mobile = data.mobile;
            }
            if (data.address) {
                user.address = data.address;
            }
            if (data.avatar) {
                user.avatar = data.avatar;
            }
            const res = await user.save();
            return res;
        } catch (error) {
            throw new Error(error);
        }
    };

    changePassword = async (passwordData: ChangePasswordUser, userID: string) => {
        try {
            const user = await this.userRepository.findById(userID);
            if (!user) throw new Error('User not found');
            const is_equal = bcrypt.compareSync(passwordData.oldPassword, user.password);
            if (!is_equal || user.isBlocked) return false;
            const passwordNew = await bcrypt.hash(passwordData.newPassword, 10);
            user.password = passwordNew;
            await user.save();
            return true;
        } catch (error) {
            console.log(error);
        }
    };

    forgotPassword = async (email: string) => {
        try {
            const user = await this.userRepository.findByCondition({ email: email });
            if (!user) throw new Error('User not found');
            const passNew = await this.generateRandomString(10);
            const passHash = await bcrypt.hash(passNew, 10);
            user.password = passHash;
            await user
                .save()
                .then(async () => {
                    const html = `Mật khẩu mới của bạn là ${passNew}`;
                    const subject = 'Cấp lại mật khẩu';
                    const data = {
                        to: email,
                        html,
                        subject
                    };
                    await this.emailService.sendMail(data);
                    return true;
                })
                .catch(() => false);
        } catch (error) {
            throw new Error('not found email');
        }
    };

    private generateRandomString(length: number) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|;:,.<>?';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    private reverse(s: string) {
        return s.split('').reverse().join('');
    }
}
