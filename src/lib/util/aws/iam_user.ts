import * as aws from '@pulumi/aws';

import { IamUserData } from '../../../model/aws/iam_user_data';
import { createKey } from '../../aws/key';
import { createUser } from '../../aws/user';
import { environment } from '../../configuration';

/**
 * Creates a new user and key.
 *
 * @param {string} name the name
 * @param {aws.iam.Policy[]} policies the policies to add (optional)
 * @returns {IamUserData} the user data
 */
export const createAWSIamUserAndKey = (
  name: string,
  {
    policies,
  }: {
    readonly policies?: readonly aws.iam.Policy[];
  },
): IamUserData => {
  const accountName = `${name}-${environment}`;
  const user = createUser(accountName, {
    policies: policies,
  });
  const key = user.name.apply((userName) => createKey(userName, user));
  return {
    user: user,
    accessKey: key,
  };
};
