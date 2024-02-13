export const shortenAddress = (address: string): string => {
  const start = address.substring(0, 4 + 2); // +2 to include '0x'
  const end = address.substring(address.length - 4);
  return `${start}...${end}`;
}

export const capitalizeString = (str: string) => {
  if(str.length === 0) {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function extractCity(address: string) {
  const parts = address.split(",");
  return parts.length > 1 ? parts[1].trim() : "";
}

export function extractStreet(address: string) {
  const parts = address.split(",");
  const firstPart = parts.length > 1 ? parts[0].trim() : "";
  return firstPart.replace(/^\d+\s*/, "");
}

export function extractZip(address: string) {
  const parts = address.split(",");
  return parts.length > 1 ? parts[3].trim() : "";
}

export function parseMessage(text: string) {
  const userRegex = /@(\w+)/g;
  const hashTagRegex = /#(\w+)/g;

  return text
    .replace(userRegex, '<a href="/$1">@$1</a>')
    .replace(hashTagRegex, '<a href="/tag/$1">#$1</a>');
}
