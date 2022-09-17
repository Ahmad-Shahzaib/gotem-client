import { $authHost, $host } from './index';

export const addProposal = async (formData) => {
	const { data } = await $authHost.post(`api/proposals/add`, formData);
	return data.message;
};

export const getAllProposals = async (queryData) => {
	const { data } = await $authHost.get(`api/proposals/all`, {
		params: queryData,
	});
	return data.message;
};

export const gelPropertiesOfProposals = async () => {
	const { data } = await $authHost.get(`api/proposals/properties`);
	return data.message;
};

export const updateProposal = async (formData) => {
	const { data } = await $authHost.put(`api/proposals/update`, formData);
	return data.message;
};

export const getProposal = async (id) => {
	const { data } = await $authHost.get(`api/proposals/one/${id}`);
	return data.message;
};
