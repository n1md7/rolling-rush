import mobile from 'is-mobile';

export const useDevice = () => {
  return {
    isMobile: () => mobile(),
  };
};
