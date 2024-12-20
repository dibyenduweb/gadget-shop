import PacmanLoader from "react-spinners/PacmanLoader";
const Loading = () => {
    return(
        <div>
           <PacmanLoader className="min-h-screen min-w-screen flex justify-center items-center"
        color="red"
        loading={true}

        size={150}
      />
        </div>
    )}
export default Loading;