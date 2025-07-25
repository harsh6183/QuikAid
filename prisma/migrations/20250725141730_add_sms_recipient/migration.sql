-- CreateEnum
CREATE TYPE "SmsRecipient" AS ENUM ('POLICE', 'HOSPITAL');

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "smsRecipient" "SmsRecipient";
