import type { Meta, StoryObj } from "@storybook/react";
import { UserCard } from "./UserCard";
import Anna from '@/assets/img/Anna.webp'

const meta: Meta<typeof UserCard> = {
  title: "User/UserCard",
  component: UserCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {
    fname: "Anna",
    age: 24,
    mainImg: Anna,
  },
};