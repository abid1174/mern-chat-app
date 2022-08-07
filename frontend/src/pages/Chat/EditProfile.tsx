import React, { useEffect, useState } from "react";
import Button from "components/Button";
import { useAppDispatch, useAppSelector } from "redux/store";
import { useUpdateProfileImageMutation } from "redux/user/userService";

type Props = {};

export default function EditProfile({}: Props) {
  const [previewImage, setPreviewImage] = useState<any>("");
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.user.data);

  const [handleUpdateImage, { isSuccess, isLoading }] =
    useUpdateProfileImageMutation();

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget?.files?.[0];
    previewFile(file);
  };

  const previewFile = (file: File | undefined) => {
    const reader = new FileReader();
    reader.readAsDataURL(file as File);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!previewImage) return;
    uploadProfileImage(previewImage);
  };

  const uploadProfileImage = (base64Image: string) => {
    handleUpdateImage({ userId: id, image: base64Image });
  };

  useEffect(() => {
    
  }, [isSuccess])

  return (
    <div>
      <h2 className="text-white mb-4 font-bold">Change Profile Picture</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" name="image" onChange={handleFileInputChange} />
        <div className="mt-2">
          <Button type="submit">
            <>Upload {isLoading && "Loading"}</>
          </Button>
        </div>
      </form>
      <div>
        {previewImage && <img src={previewImage} alt="profile-image" />}
      </div>
    </div>
  );
}
