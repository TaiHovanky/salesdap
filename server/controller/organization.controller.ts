import { Organization } from '../entity/organization';

export const createOrganization = async (req: any, res: any) => {
  const { name } = req.body;
  const newOrganization = new Organization(name)
  const org = await Organization.save(newOrganization);
  res.send(org);
};

export const getOrganizations = async (_: any, res: any) => {
  const organizations = await Organization.find();
  res.send(organizations);
}

// export const findOrganizationByName = async (req, res) => {

// }