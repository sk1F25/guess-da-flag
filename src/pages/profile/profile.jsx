import { Select } from "../../components/ui/select";
import { useState } from "react";
import { useAuthStore } from "../../store/auth-store";
import { options } from "./countries";
import defaultAvatar from "../../assets/avatar.jpg";

export function Profile() {
  const { user, updateUser } = useAuthStore();
  const [selectedFlag, setSelectedFlag] = useState(user.avatar);
  const [username, setUsername] = useState(user.username);
  const [isEditing, setIsEditing] = useState(false);

  const avatarSrc = (user) =>
    user.avatar === "default"
      ? defaultAvatar
      : `https://flagcdn.com/${selectedFlag}.svg`;

  const handleFlagChange = (value) => {
    setSelectedFlag(value);
    setIsEditing(true);
  };

  const handleUsernameChange = (value) => {
    setUsername(value.target.value);
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    updateUser({
      username,
      avatar: selectedFlag,
    });
    console.log("Сохранено:", username, selectedFlag);
  };

  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-8">Профиль</h1>
      <div className="w-full flex flex-col items-center justify-center gap-6">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="mb-4 w-40 h-28 overflow-hidden rounded-lg ">
            <img
              src={avatarSrc(user)}
              alt="Флаг страны"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <label className="text-sm font-medium mb-2">Флаг страны</label>
            <Select
              options={options}
              value={selectedFlag}
              onChange={handleFlagChange}
              placeholder="Выберите опцию"
              className="w-full max-w-xs"
            />
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <label className="text-sm font-medium mb-2">Имя пользователя</label>
          <input
            className="border border-gray-300 rounded-md p-2 w-full max-w-xs"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <button
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isEditing}
          onClick={handleSave}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
}
