'use server';

import { serverMutation } from "../core/server";
import { revalidatePath } from "next/cache";

export const createCompany = async (newCompanyData) => {
    return serverMutation('/api/companies', newCompanyData);
}

export const updateCompany = async (id, data) => {
    const result = serverMutation(`/api/companies/${id}`, data, 'PATCH');
    revalidatePath('/dashboard/admin/companies');
    return result;
}
