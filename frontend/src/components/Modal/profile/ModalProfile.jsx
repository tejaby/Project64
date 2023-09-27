// context
import { InterfaceContext } from "../../../context/Interface";
import { UserContext } from "../../../context/User";

// hooks
import UseSvgLoader from "../../../hooks/useSvgLoader";
import useToggleModalPost from "../../../hooks/interface/useToggleModalPost";
import useFileReader from "../../../hooks/post/useFileReader";

// react
import { useContext, useState } from "react";

function ModalProfile() {
  const { showModalProfile, setShowModalProfile } =
    useContext(InterfaceContext);
  const { user } = useContext(UserContext);

  const { toggleShowModal } = useToggleModalPost(
    setShowModalProfile,
    showModalProfile
  );

  const [cover, setCover] = useState(null);

  const { handleChangeFile } = useFileReader(cover, setCover);

  return (
    <>
      <div
        className={`flex flex-col w-full h-full xs:max-w-xl xs:h-3/5 sm:h-3/4 xs:rounded-lg bg-white`}
      >
        <div className="flex border-b-2 p-2 ">
          <button
            className="font-semibold hover:text-primary"
            onClick={toggleShowModal}
          >
            salir
          </button>
          <p className="grow text-base font-semibold">Editar perfil</p>
          <button className="font-semibold hover:text-primary">Guardar</button>
        </div>

        <form className="grow flex flex-col">
          <div className="basis-1/2 flex flex-col justify-center">
            <div className="py-2">
              <p className="text-base sm:text-lg">Actualizar foto de perfil</p>
            </div>
            <div
              className={`${
                !!cover ? "relative grow " : ""
              }flex justify-center items-center`}
            >
              {!cover ? (
                <input
                  type="file"
                  accept=".png, .jpg, .webp"
                  className="text-sm text-slate-500 file:mr-2 file:p-4 file:rounded-full file:border-0 file:font-semibold file:bg-violet-100 file:text-black hover:file:bg-primary hover:file:text-white"
                  onChange={handleChangeFile}
                />
              ) : (
                <img
                  src={cover}
                  alt=""
                  className="absolute w-full h-full xs:w-32 xs:h-32 sm:w-44 sm:h-44 object-cover xs:rounded-full"
                />
              )}
            </div>
          </div>
          <div className="basis-1/2 flex flex-col justify-center">
            <div className="basis-1/2 flex flex-col justify-center items-center">
              <label className="text-base font-semibold sm:text-lg">
                Biografía
              </label>
              <textarea className="grow w-4/5 border text-base text-center resize-none focus:outline-none focus:border-primary" />
              <p className="text-xs text-gray-500 pb-2">
                Cuéntanos un poco sobre ti en unas pocas palabras.
              </p>
            </div>
            <div className="basis-1/2 flex flex-col justify-center items-center">
              <label className="text-base font-semibold sm:text-lg">
                Sitio Web
              </label>
              <input
                type="text"
                className="w-4/5 py-2 px-3 border rounded focus:outline-none focus:border-primary"
              />
              <p className="text-xs text-gray-500 pb-2">
                Agrega enlaces a tus perfiles en redes sociales y sitios web
                aquí.
              </p>
            </div>
          </div>
        </form>
      </div>

      <div className="hidden xs:block absolute top-0 right-0 p-4">
        <button
          onClick={() => {
            toggleShowModal();
          }}
        >
          <UseSvgLoader name="x" options={{ width: "32px", height: "32px" }} />
        </button>
      </div>
    </>
  );
}

export default ModalProfile;
