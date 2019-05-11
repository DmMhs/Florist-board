import { Labels } from "../models/Labels";

export const createObjectPath = (object: Labels, path: any, value = null as string | null | undefined) => {
    path = typeof path === 'string' ? path.split('.') : path;
    let current = object;
    while (path.length > 1) {
      const [head, ...tail] = path;
      path = tail;
      if (current[head] === undefined) {
        current[head] = {};
      }
      current = current[head];
    }
    current[path[0]] = value;
    return object;
  };