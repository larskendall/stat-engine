import { User } from '../sqldb';

export function buildUser(customProps = {}) {
  return User.build({
    provider: 'local',
    role: 'user',
    first_name: 'Fake',
    last_name: 'User',
    username: 'fakeuser',
    email: 'fakeuser@fake.com',
    password: 'password',
    nfors: true,
    api_key: 'apiKey',
    aws_access_key_id: 'awsKey',
    aws_secret_access_key: 'awsSecret',
    ...customProps,
  });
}
