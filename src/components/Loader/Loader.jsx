import { ThreeCircles } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <ThreeCircles
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      wrapperClass=""
      color="#c0efff"
      ariaLabel="three-circles-loading"
      outerCircleColor=""
      innerCircleColor=""
      middleCircleColor=""
      visible={true}
      height={100}
      width={100}
    />
  );
};
