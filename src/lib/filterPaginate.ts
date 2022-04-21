import mongoose from 'mongoose';

export async function filterPaginate(
    Model: mongoose.Model<any>,
    filter: { [key: string]: any; } = {},
    page = 1,
    limit = 10,
    sort: string | string[] = 'createdAt') {
    const docs = await Model.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(typeof sort === 'string' ? sort : sort.join(' '));

    const totalDocs = await Model.countDocuments(filter);

    const totalPages = Math.ceil(totalDocs / limit);
    return { docs, totalDocs, totalPages };
}
