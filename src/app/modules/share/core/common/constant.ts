export const HOST = 'localhost';
export const PORT = '8082';

export const getEndPoint = (uri: string) => {
  return `http://${HOST}:${PORT}/api/v1/${uri}`;
};

/*------------------------ Service End points -----------------------------*/

export const POST_ATHLETE_CREATE = 'athlete/create';

export const GET_SEARCH_ATHLETE = 'athlete/search';
export const GET_COMMON_ATHLETE_PAGE_DATA = 'common/getall';
