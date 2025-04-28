export type Params = Promise<{
  slug: string;
  id: string;

  nombre?: string;
  categorie?: string;
  type?: "physical" | "digital";
  limit?: string;
  min?: string;
  max?: string;
  page?: string;

  sort?: "asc" | "desc";
}>;
