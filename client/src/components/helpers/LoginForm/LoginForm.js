import useUserLogin from "./useUserLogin";
import LoginFormTemplate from "../../UI/LoginFormTemplate/LoginFormTemplate";

function LoginForm() {
  const [register, handleSubmit, mutation, formSubmitHandler] = useUserLogin();

  return (
    <>
      <LoginFormTemplate
        register={register}
        mutation={mutation}
        handleSubmit={handleSubmit}
        formSubmitHandler={formSubmitHandler}
      />
    </>
  );
}

export default LoginForm;
