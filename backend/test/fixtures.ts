import {
  randUser,
  randUuid,
  randQuote,
  randCountry,
  randImg,
  randText,
  randUrl,
  randUserName,
} from '@ngneat/falso';
import { Role } from '@prisma/client';
import * as cuid from 'cuid';
import { ExtendedGrant } from 'src/grants/grants.interface';
import { UserProfile } from 'src/users/users.interface';

// Creating a mock result
const users: UserProfile[] = [...Array(3)].map((_, index) => {
  const userData = randUser();

  return {
    id: cuid(),
    name: `${userData.firstName} ${userData.lastName}`,
    email: userData.email,
    emailVerified: null,
    visitorId: randUuid(),
    role: index % 2 === 0 ? Role.Admin : Role.User, // Every odd user is an admin
    flagged: false,
    image: userData.img,
    bio: randQuote(),
    twitter: userData.username,
    contributions: [
      {
        id: cuid(),
        userId: cuid(),
        grantId: cuid(),
        matchingRoundId: null,
        amount: 1000,
        denomination: 'USD',
        amountUsd: 1000,
        paymentMethodId: cuid(),
        flagged: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    grants: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

const grants: ExtendedGrant[] = [
  {
    id: cuid(),
    name: 'test one',
    description: randText(),
    image: randImg(),
    twitter: randUserName(),
    website: randUrl(),
    location: randCountry(),
    paymentAccountId: randUuid(),
    fundingGoal: 100,
    contributions: [
      {
        id: randUuid(),
        userId: randUuid(),
        amount: 100,
        denomination: 'USD',
        amountUsd: 100,
        grantId: 'cld1dnt1y000008m97yakhtrf',
        matchingRoundId: null,
        paymentMethodId: randUuid(),
        flagged: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    team: [users[0]],
    verified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: cuid(),
    name: 'test two',
    description: randText(),
    image: randImg(),
    twitter: randUserName(),
    website: randUrl(),
    location: randCountry(),
    paymentAccountId: randUuid(),
    fundingGoal: 100,
    contributions: [
      {
        id: randUuid(),
        userId: randUuid(),
        amount: 50,
        denomination: 'USD',
        amountUsd: 50,
        grantId: cuid(),
        matchingRoundId: null,
        paymentMethodId: randUuid(),
        flagged: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    team: [users[1]],
    verified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: cuid(),
    name: 'test three',
    description: randText(),
    image: randImg(),
    twitter: randUserName(),
    website: randUrl(),
    location: randCountry(),
    paymentAccountId: randUuid(),
    fundingGoal: 100,
    contributions: [],
    team: [users[2]],
    verified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const prismaService = {
  user: {
    findUnique: jest.fn().mockResolvedValue(users[0]),
    update: jest.fn().mockResolvedValue(users[0]),
  },
  grant: {
    findMany: jest.fn().mockResolvedValue(grants),
    findUnique: jest.fn().mockResolvedValue(grants[0]),
    create: jest.fn().mockResolvedValue(grants[0]),
    update: jest.fn().mockResolvedValue(grants[0]),
  },
};

const providerService = {
  getProvider: jest.fn().mockResolvedValue({
    id: cuid(),
  }),
};

export { users, grants, prismaService, providerService };
