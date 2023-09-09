import { Circles } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Circles
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      wrapperClass=""
      color="cornflowerblue"
      ariaLabel="circles-loading"
      visible={true}
      height={100}
      width={100}
    />
  );
};
