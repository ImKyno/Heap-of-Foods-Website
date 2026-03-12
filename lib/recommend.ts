export interface RecipeInput {
  name: string;
  hunger?: number | null;
  health?: number | null;
  sanity?: number | null;
  foodtype?: string;
  card_def?: { items: string[] }[];
}

function getIngredients(recipe: RecipeInput): string[] {
  if (!recipe.card_def) return [];
  return recipe.card_def.flatMap((block) => block.items);
}

function ingredientOverlap(a: RecipeInput, b: RecipeInput): number {
  const aItems = new Set(getIngredients(a));
  const bItems = getIngredients(b);
  return bItems.filter((item) => aItems.has(item)).length;
}

type ScoredCandidate = { candidate: RecipeInput; distance: number; overlap: number };

function rankCandidates(base: RecipeInput, all: RecipeInput[]): ScoredCandidate[] {
  const candidates = all.filter((r) => r.name !== base.name);
  if (candidates.length === 0) return [];

  const getValue = (v: number | null | undefined) => v ?? 0;

  const hungerValues = all.map((r) => getValue(r.hunger));
  const healthValues = all.map((r) => getValue(r.health));
  const sanityValues = all.map((r) => getValue(r.sanity));

  const minHunger = Math.min(...hungerValues);
  const maxHunger = Math.max(...hungerValues);
  const minHealth = Math.min(...healthValues);
  const maxHealth = Math.max(...healthValues);
  const minSanity = Math.min(...sanityValues);
  const maxSanity = Math.max(...sanityValues);

  const normalize = (v: number, min: number, max: number) =>
    max === min ? 0 : (v - min) / (max - min);

  const baseHunger = normalize(getValue(base.hunger), minHunger, maxHunger);
  const baseHealth = normalize(getValue(base.health), minHealth, maxHealth);
  const baseSanity = normalize(getValue(base.sanity), minSanity, maxSanity);

  const scored: ScoredCandidate[] = candidates.map((candidate) => {
    const cHunger = normalize(getValue(candidate.hunger), minHunger, maxHunger);
    const cHealth = normalize(getValue(candidate.health), minHealth, maxHealth);
    const cSanity = normalize(getValue(candidate.sanity), minSanity, maxSanity);

    let distance = Math.sqrt(
      Math.pow(baseHunger - cHunger, 2) +
        Math.pow(baseHealth - cHealth, 2) +
        Math.pow(baseSanity - cSanity, 2),
    );

    if (base.foodtype && candidate.foodtype === base.foodtype) {
      distance *= 0.8;
    }

    const overlap = ingredientOverlap(base, candidate);
    return { candidate, distance, overlap };
  });

  scored.sort((a, b) =>
    a.distance !== b.distance
      ? a.distance - b.distance
      : b.overlap - a.overlap,
  );

  return scored;
}

export function recommendRecipe(
  base: RecipeInput,
  all: RecipeInput[],
): RecipeInput | null {
  const ranked = rankCandidates(base, all);
  if (ranked.length === 0) return null;

  // Prefer candidates that don't create a mutual back-pointer (1:1 ping-pong).
  // For each candidate in ranked order, check if it would also point back to base.
  // If it would, skip it and try the next one.
  for (const { candidate } of ranked) {
    const reverseTop = rankCandidates(candidate, all)[0];
    if (reverseTop?.candidate.name !== base.name) return candidate;
  }

  // All candidates point back to base — return the closest one as fallback.
  return ranked[0].candidate;
}
