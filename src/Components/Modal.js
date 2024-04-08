// src/Components/Modal.js
const Modal = ({ isOpen, close }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={close}>
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center text-xl mb-4">
            <h6 className="text-xl font-bold">Subir archivo</h6>
            <button 
              className="font-semibold text-2xl" 
              onClick={close}
            >
              &times;
            </button>
          </div>
          <div className="mb-4">
            <form>
              <input type="file" id="fileInput" name="fileInput" accept=".pdf,.doc,.docx" style={{ display: 'none' }} />
              <label htmlFor="fileInput"  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition ease-in-out duration-300 cursor-pointer">
                Subir documento
              </label>
            </form>
          </div>
          <div className="mb-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition ease-in-out duration-300">Subir desde URL</button>
          </div>
          <div className="mb-4">
            <input type="text" placeholder="Ingresar texto" className="px-4 py-2 border rounded w-full" />
          </div>
        </div>
      </div>
    );
  };

export default Modal;
