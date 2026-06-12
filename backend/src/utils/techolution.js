import axios from "axios";

const getTecholutionJobs = async (
  apiUrl
) => {
  const response =
    await axios.get(apiUrl);

  const categories =
    response.data?.data || [];

  return categories.flatMap(
    (category) =>
      category.roles || []
  );
};

export default getTecholutionJobs;