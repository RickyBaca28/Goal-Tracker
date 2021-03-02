import UserModel, { IUser, IUserDocument } from '../models/user';

// gets a global list of every user
export const getUserList = async (): Promise<IUser[]> => {
    const users: IUserDocument[] = await UserModel.find({}).exec();

    return users.map(
        (user: IUserDocument): IUser => {
            return user.toObject();
        },
    );
};

// gets user's info by its id
export const getUser = async (userId: string): Promise<IUser> => {
    const user: IUserDocument = await UserModel.findOne({ username: userId }).exec();
    return user;
};

// adds an item to the db
export const createUser = async (payload: any): Promise<IUser> => {
    const user = new UserModel(payload);
    const savedUser = await user.save();

    const result: IUser = savedUser.toObject();
    delete user.__v;

    return result;
};