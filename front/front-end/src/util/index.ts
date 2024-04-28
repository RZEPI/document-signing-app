export function makeInputName(name: string): string {
  return name.toLowerCase().replace(/ /g, "-");
}