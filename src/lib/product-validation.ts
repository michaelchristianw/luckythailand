import { NextResponse } from "next/server";

type ProductMutationData = {
  category?: string;
  name?: string;
  engname?: string | null;
  price?: number;
  imageurl?: string;
  size?: string | null;
  quantity?: number | null;
  volume?: number | null;
  dimensions?: string | null;
  unit?: string | null;
  variant?: string | null;
  description?: string | null;
};

type ProductCreateData = ProductMutationData & {
  category: string;
  name: string;
  price: number;
  imageurl: string;
};

const stringFields = [
  "category",
  "name",
  "engname",
  "imageurl",
  "size",
  "dimensions",
  "unit",
  "variant",
  "description",
] as const;

const numberFields = ["price", "quantity", "volume"] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function parseNumber(value: unknown) {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string" && value.trim() !== "") {
    const numberValue = Number(value);
    return Number.isFinite(numberValue) ? numberValue : null;
  }

  return null;
}

function parseProductData(body: Record<string, unknown>) {
  const data: ProductMutationData = {};

  for (const field of stringFields) {
    const value = body[field];
    if (typeof value === "string") data[field] = value.trim();
    if (
      value === null &&
      field !== "category" &&
      field !== "name" &&
      field !== "imageurl"
    ) {
      data[field] = null;
    }
  }

  for (const field of numberFields) {
    const value = body[field];
    if (value === null && field !== "price") {
      data[field] = null;
      continue;
    }

    if (value !== undefined) {
      const numberValue = parseNumber(value);
      if (numberValue === null) return null;
      data[field] = numberValue;
    }
  }

  return data;
}

export function parseProductId(value: unknown) {
  const id = parseNumber(value);
  if (!id || !Number.isInteger(id) || id < 1) return null;

  return id;
}

export async function readJsonBody(req: Request) {
  try {
    const body = await req.json();
    return isRecord(body) ? body : null;
  } catch {
    return null;
  }
}

export function validateCreateProduct(body: Record<string, unknown>) {
  const data = parseProductData(body);
  const category = data?.category;
  const name = data?.name;
  const price = data?.price;
  const imageurl = data?.imageurl;

  if (!data || !category || !name || price === undefined || !imageurl) {
    return {
      error: NextResponse.json(
        { error: "category, name, price, and imageurl are required" },
        { status: 400 }
      ),
      data: null,
    };
  }

  const createData: ProductCreateData = {
    ...data,
    category,
    name,
    price,
    imageurl,
  };

  return { error: null, data: createData };
}

export function validateUpdateProduct(body: Record<string, unknown>) {
  const id = parseProductId(body.id);
  const data = parseProductData(body);

  if (!id || !data) {
    return {
      error: NextResponse.json(
        { error: "A valid product id and update data are required" },
        { status: 400 }
      ),
      data: null,
      id: null,
    };
  }

  if (Object.keys(data).length === 0) {
    return {
      error: NextResponse.json(
        { error: "At least one product field is required" },
        { status: 400 }
      ),
      data: null,
      id: null,
    };
  }

  return { error: null, data, id };
}
