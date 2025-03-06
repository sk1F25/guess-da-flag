import { useState } from "react";
import { useAuthStore } from "../../store/auth-store";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signUp } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = isLogin
      ? await signIn(username, password)
      : await signUp(username, password);

    if (!result.success) {
      alert(result.error);
      console.log(result.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-40">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 rounded border"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded border"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {isLogin ? "Войти" : "Зарегистрироваться"}
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500"
        >
          {isLogin ? "Создать аккаунт" : "Уже есть аккаунт?"}
        </button>
      </form>
    </div>
  );
}
