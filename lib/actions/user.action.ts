// crete Account Flow
// 1 user enters full name, email
// 2 check if the user already exists using email
// 3 send OTP to the user email
// 4 that will send a key for creating a session
// 5 Create a new document if the user does not exist
// 6 Create the user's account ID for user login
// 7 verify the OTP and authenticate the user

"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();
  const result = await databases.listDocuments(
    appwriteConfig.database,
    appwriteConfig.usersCollection,
    [Query.equal("email", [email])]
  );
  return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown, message: string) => {
  console.error(message, error);
  throw error instanceof Error ? error : new Error(message);
};
export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();
  try {
    const result = await account.createEmailToken(ID.unique(), email);
    return result.userId;
  } catch (error) {
    handleError(error, `Failed to send OTP to ${email}`);
  }
};

export const createAccount = async (fullName: string, email: string) => {
  const exsistingUser = await getUserByEmail(email);
  const account = await sendEmailOTP({ email });
  if (!account) throw new Error(`Failed to create account for ${email}`);

  if (!exsistingUser) {
    const { databases } = await createAdminClient();
    try {
      await databases.createDocument(
        appwriteConfig.database,
        appwriteConfig.usersCollection,
        ID.unique(),
        {
          fullName,
          email,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&size=128&background=random`,
          accountId: account,
        }
      );
    } catch (error) {
      handleError(error, `Failed to create user document for ${email}`);
    }
  }
  return parseStringify({ accountId: account });
};

export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
    try {
        const {account} = await createAdminClient();
        const session = await account.createSession(accountId, password);
        (await cookies()).set('appwrite-session', session.secret,{
            path:"/",
            httpOnly:true,
            sameSite:"strict",
            secure:true
        });
        return parseStringify({sessionId:session.$id});
    } catch (error) {
        handleError(error,"failed to verify OTP" );
    }
};
