"use server";

import { headlessServer } from "@/sdk/headlessServer";

export const updateUser = async (formData: FormData) => {
  const headlessServerInstance = await headlessServer();

  const id = formData.get("id") as string;
  const username = formData.get("username") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  if (!headlessServerInstance) {
    return;
  }

  try {
    const response = await headlessServerInstance.members.updateMember(id, {
      contact: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        phones: [phone],
      },
      loginEmail: email || undefined,
      profile: { nickname: username || undefined },
    });

    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export async function updateListProductsByFilter(brand: string) {}
