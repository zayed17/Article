export const validateWordCount = (value: string, minWords: number) => {
    if (!value || value.trim() === "") {
      return Promise.resolve(); 
    }
    
    const wordCount = value.trim().split(/\s+/).length;
    if (wordCount < minWords) {
      return Promise.reject(
        new Error(`Please write at least ${minWords} words. Current word count: ${wordCount}`)
      );
    }
    return Promise.resolve();
  };
  

  export const validateTags = (value: string[]) => {
    if (!value || value.length === 0) {
      return Promise.reject("At least one tag is required!");
    }
    return Promise.resolve();
  };
  