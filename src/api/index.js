import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";

export const pageTypeMap = {
  popular: getPopular,
  rated: getRated,
  upcoming: getUpcoming
}

// export async function getDiscover(page = 1) {
//     // console.log(`${process.env.REACT_APP_TRAILER_MOVIES_WATCH_API_KEY}`);
//     // const data = await fetch(`${API_URL}/discover/movie?api_key=${process.env.REACT_APP_TRAILER_MOVIES_WATCH_API_KEY}`);
//     // console.log(data);
//     // const res = await data.json();
//     // console.log(res);
//     const type = "/movie/popular"; !!!!
//     const { data: { results} } = await axios.get(`${API_URL + type}`, {
//       params: {
//         api_key: process.env.REACT_APP_TRAILER_MOVIES_WATCH_API_KEY,
//         // query: searchKey
//         page
//       }
//     });
//     // setSelectedMovie(results[0]);
//     // // console.log(data);
//     // // console.log("Results: ", results);
//     // selectMovie(results[0]);
//     // setMovies(results);
//     return results;
// }

export async function getPopular(page = 1) {
  // console.log(`${process.env.REACT_APP_TRAILER_MOVIES_WATCH_API_KEY}`);
  // const data = await fetch(`${API_URL}/discover/movie?api_key=${process.env.REACT_APP_TRAILER_MOVIES_WATCH_API_KEY}`);
  // console.log(data);
  // const res = await data.json();
  // console.log(res);
  const endpoint = "/movie/popular";
  const { data: { results}, data: {total_pages} } = await axios.get(`${API_URL + endpoint}`, {
    params: {
      api_key: process.env.REACT_APP_TRAILER_MOVIES_WATCH_API_KEY,
      // query: searchKey
      page
    }
  });
  // setSelectedMovie(results[0]);
  // // console.log(data);
  // // console.log("Results: ", results);
  // selectMovie(results[0]);
  // setMovies(results);
  return {results, totalPages: total_pages};
}

export async function getRated(page = 1) {
  const endpoint = "/movie/top_rated";
  const { data: { results}, data: {total_pages} } = await axios.get(`${API_URL + endpoint}`, {
    params: {
      api_key: process.env.REACT_APP_TRAILER_MOVIES_WATCH_API_KEY,
      page
    }
  });
  return {results, totalPages: total_pages};
}

export async function getUpcoming(page = 1) {
  const endpoint = "/movie/upcoming";
  const { data: { results}, data: {total_pages} } = await axios.get(`${API_URL + endpoint}`, {
    params: {
      api_key: process.env.REACT_APP_TRAILER_MOVIES_WATCH_API_KEY,
      page
    }
  });
  // console.log(data);
  console.log(total_pages);
  return {results, totalPages: total_pages};
}

export async function getByName(query) {
    // console.log(`${process.env.REACT_APP_TRAILER_MOVIES_WATCH_API_KEY}`);
    // const data = await fetch(`${API_URL}/discover/movie?api_key=${process.env.REACT_APP_TRAILER_MOVIES_WATCH_API_KEY}`);
    // console.log(data);
    // const res = await data.json();
    // console.log(res);
    const type = "/search/movie";
    const { data: { results} } = await axios.get(`${API_URL + type}`, {
      params: {
        api_key: process.env.REACT_APP_TRAILER_MOVIES_WATCH_API_KEY,
        query
      }
    });
    // setSelectedMovie(results[0]);
    // // console.log(data);
    // // console.log("Results: ", results);
    // selectMovie(results[0]);
    // setMovies(results);
    return results;
}

export async function getWithVideos(id) {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
        params: {
          api_key: process.env.REACT_APP_TRAILER_MOVIES_WATCH_API_KEY,
          append_to_response: 'videos'
        }
      })
    return data;
}

