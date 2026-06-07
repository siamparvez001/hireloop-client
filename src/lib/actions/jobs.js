'use server'

import { serverMutation } from "../core/server";

export const createJob = async (newJobData) => {
    return serverMutation('/api/jobs', newJobData);
}

