export const fetchCourses = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }
    const data = await response.json();
    return data.slice(0, 10).map((item, index) => ({
      id: `${index + 1}`,
      name: item.title,
      code: `C${index + 1}`,
    }));
  } catch (error) {
    throw error;
  }
};
