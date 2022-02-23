
const seoOptimization = (page, description, options) => {
  const SEO = {
    // Og tags
    openGraph: {
      title: `TRANSFERWIZE - ${page}`,
      description,
    },

    // Other , which can overwrite `openGraph` tags
    ...options,

    title: `TRANSFERWIZE - ${page}`,
    description,
  };

  return SEO;
};

export default seoOptimization;
