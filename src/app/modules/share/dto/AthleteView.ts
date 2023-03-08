export default class AthleteView {
  firstName: string = '';
  lastName: string = '';
  country: string = '';
  gender: string = '';
  birthyear: string = '';
  image: string = '';
  eventList: { eventId: string, result: string | null }[] = [];

}
