import { ObjectId, Types } from 'mongoose';

export const getObjectId = (id: string) => {
  return new Types.ObjectId(id);
};

export const randomEnum = (Enum: any) => {
  const enumValues = Object.values(Enum);
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
};

export const randomAssignIds = (assignIds: any[]) => {
  const minValues = 1;
  const maxValues = assignIds.length;

  const numToSelect =
    Math.floor(Math.random() * (maxValues - minValues + 1)) + minValues;

  // Shuffle the original array to randomize the order
  const shuffledAssignId = assignIds.slice().sort(() => Math.random() - 0.5);

  // Take the first 'numToSelect' elements from the shuffled array
  const cloneAssignId = shuffledAssignId.slice(0, numToSelect);

  return cloneAssignId;
};

export const randomDate = () => {
  const startDate = new Date();
  const minDays = 2;
  const maxDays = 5;

  const randomDays =
    Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;

  const dueDate = new Date(startDate);
  dueDate.setDate(startDate.getDate() + randomDays);
  return dueDate;
};

export const reduceTasksByStartDate = (tasks: any, startDate: any) => {
  const counts = {};

  tasks.forEach((task) => {
    const doneAt = new Date(task.doneAt) as any;
    const doneAtDate = new Date(startDate) as any;

    if (doneAt >= doneAtDate) {
      const hourDiff = Math.floor((doneAt - doneAtDate) / (1000 * 60 * 60));
      counts[hourDiff] = (counts[hourDiff] || 0) + 1;
    }
  });

  const result = Array.from({ length: 7 }, (_, index) => counts[index] || 0);
  return result;
};
