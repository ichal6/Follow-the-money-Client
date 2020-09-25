export class Activity{
  id: number;
  title: string;
  payeeFrom: string;
  payeeTo: string;
  date: Date;
  cost: number;

  static fromHttp(activity: Activity): Activity {
    const newActivity = new Activity();
    newActivity.id = activity.id;
    newActivity.title = activity.title;
    newActivity.payeeFrom = activity.payeeFrom;
    newActivity.payeeTo = activity.payeeTo;
    newActivity.date = activity.date;
    newActivity.cost = activity.cost;

    return newActivity;
  }
}
