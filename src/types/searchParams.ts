export type Params = Promise<{
  slug: string;

  productName?: string;
  categorie?: string;
  type?: "physical" | "digital";
  limit?: string;
  sort?: string;
  min?: string;
  max?: string;
  page?: string;
}>;
