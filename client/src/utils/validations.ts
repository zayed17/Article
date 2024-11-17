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
  

  export const validatePreferences = (value: string[], minPreferences: number) => {
    if (!value || value.length === 0) {
      return Promise.reject(new Error('Preferences are required!'));
    }
    if (value.length < minPreferences) {
      return Promise.reject(
        new Error(`Please select at least ${minPreferences} preferences! Current count: ${value.length}`)
      );
    }
    return Promise.resolve();
  };
  