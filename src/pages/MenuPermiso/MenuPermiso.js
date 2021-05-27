import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { handleChangeInput } from "../../lib/helpers";
import {
  addMenu,
  getEmpresa,
  getOnlyMenuWithEmpresaByEmpresa,
} from "../../services/AdministracionService";
import { usePagination } from "../../hooks/usePagination";
import PaginationComponent from "../../components/Table/Pagination/PaginationComponent";
import {connect} from "react-redux";

function MenuPermiso({ currentUser }) {
  const menuTypes = [
    { Id: 1, name: "Menu web site" },
    { Id: 2, name: "Permiso" },
  ];
  const [empresas, setEmpresas] = useState([]);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const { u_usuario } = currentUser?.userLogin?.data[0];
  const [menu, setMenu] = useState({
    m_usuario_ing: u_usuario,
    m_terminal_ing: 'Newbound 2.0',
    m_estado: true,
    m_nombre: "",
    m_descripcion: "",
    m_bit_padre: false,
    m_cod_padre: 0,
    m_url: "",
    m_icon: "",
    m_controlador: null,
    m_accion: null,
    m_index: 0,
    m_cod_tipo_menu: 0,
    m_id_empresa: 0,
  });
  const optionsMenus = menuTypes.map((menu) => (
    <option key={menu.Id} value={menu.Id}>
      {" "}
      {menu.name}{" "}
    </option>
  ));
  const optionsEmpresas = empresas.map((empresa) => (
    <option key={empresa.e_id} value={empresa.e_id}>
      {" "}
      {empresa.e_nombre_completo}{" "}
    </option>
  ));

  const [
    currentItems,
    totalItems,
    paginate,
    itemsPerPage,
    currentPage,
  ] = usePagination(menus);

  function handleChangeMenu(e) {
    setMenu((prevMenu) => ({
      m_usuario_ing: u_usuario,
      m_terminal_ing: 'Newbound 2.0',
      m_estado: true,
      m_nombre: "",
      m_descripcion: "",
      m_bit_padre: false,
      m_cod_padre: 0,
      m_url: "",
      m_icon: "",
      m_controlador: null,
      m_accion: null,
      m_index: 0,
      m_cod_tipo_menu: parseInt(e.target.value),
      m_id_empresa: prevMenu.m_id_empresa,
    }));
  }

  function handleSelectPadre(Id) {
    setMenu((prevMenu) => ({
      m_usuario_ing: prevMenu.m_usuario_ing,
      m_terminal_ing: prevMenu.m_terminal_ing,
      m_estado: prevMenu.m_estado,
      m_nombre: prevMenu.m_nombre,
      m_descripcion: prevMenu.m_descripcion,
      m_bit_padre: prevMenu.m_bit_padre,
      m_cod_padre: Number.parseInt(Id),
      m_url: prevMenu.m_url,
      m_icon: prevMenu.m_icon,
      m_controlador: prevMenu.m_controlador,
      m_accion: prevMenu.m_accion,
      m_index: prevMenu.m_index,
      m_cod_tipo_menu: prevMenu.m_cod_tipo_menu,
      m_id_empresa: prevMenu.m_id_empresa,
    }));
  }

  useEffect(() => {
    getEmpresa(setEmpresas);
  }, []);

  useEffect(
    function () {
      getOnlyMenuWithEmpresaByEmpresa(menu.m_id_empresa, setMenus);
    },
    [menu.m_id_empresa]
  );

  return (
    <div className="card mt-3 ml-2">
      <h5 className="card-header base-background-gradient text-uppercase text-white">
        Crear Menu-Permiso
      </h5>
      <div className="card-body">
        <form onSubmit={(e) => addMenu(e, menu, setLoading)}>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label className="font-weight-bold text-uppercase">Empresa</label>
              <select
                className="custom-select"
                required
                value={menu.m_id_empresa}
                onChange={(e) =>
                  handleChangeInput(e, "m_id_empresa", menu, setMenu)
                }
              >
                {empresas.length === 0 ? (
                  <option>no hay empresas</option>
                ) : (
                  <>
                    <option value={0}>Selecciona...</option>
                    {optionsEmpresas}
                  </>
                )}
              </select>
            </div>
            <div className="form-group col-md-4">
              <label className="font-weight-bold text-uppercase">Tipo</label>
              <select
                className="custom-select"
                required
                value={menu.m_cod_tipo_menu}
                onChange={(e) => handleChangeMenu(e)}
              >
                {
                  <>
                    <option value={0}>Selecciona...</option>
                    {optionsMenus}
                  </>
                }
              </select>
            </div>

            <div className="form-group col-md-4">
              <label className="font-weight-bold text-uppercase">
                Alias del permiso
              </label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Descripción del permiso"
                value={menu.m_descripcion}
                onChange={(e) =>
                  handleChangeInput(e, "m_descripcion", menu, setMenu)
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label className="font-weight-bold text-uppercase">Nombre</label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Nombre del menu o permiso"
                value={menu.m_nombre}
                onChange={(e) =>
                  handleChangeInput(e, "m_nombre", menu, setMenu)
                }
              />
            </div>
            {menu.m_cod_tipo_menu === 0 || menu.m_cod_tipo_menu === 2 ? (
              <></>
            ) : (
              <>
                <div className="form-group col-md-4">
                  <label className="font-weight-bold text-uppercase">
                    Icon
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="Icono del menu"
                    value={menu.m_icon}
                    onChange={(e) =>
                      handleChangeInput(e, "m_icon", menu, setMenu)
                    }
                  />
                </div>
                <div className="form-group col-md-4">
                  <label className="font-weight-bold text-uppercase">
                    Posicion en menu
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Posicion para colocar el menu"
                    pattern="[0-9]+"
                    value={menu.m_index}
                    onChange={(e) =>
                      handleChangeInput(e, "m_index", menu, setMenu)
                    }
                  />
                </div>
              </>
            )}
          </div>
          {menu.m_cod_tipo_menu === 0 || menu.m_cod_tipo_menu === 2 ? (
            <></>
          ) : (
            <>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label className="font-weight-bold text-uppercase">Url</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="Url del menu"
                    value={menu.m_url}
                    onChange={(e) =>
                      handleChangeInput(e, "m_url", menu, setMenu)
                    }
                  />
                </div>
              </div>

              <div className="form-row pl-1">
                <div className="form-check form-check-inline ">
                  <label className="form-check-label font-weight-bold text-uppercase">
                    ¿Es padre ?
                  </label>
                  <input
                    className="form-check-input ml-1"
                    type="checkbox"
                    value={menu.m_bit_padre}
                    onChange={(e) =>
                      handleChangeInput(e, "m_bit_padre", menu, setMenu)
                    }
                  />
                </div>

                <div className="form-check form-check-inline ">
                  <label className="form-check-label font-weight-bold text-uppercase">
                    Activar / desactivar
                  </label>
                  <input
                    className="form-check-input ml-1"
                    type="checkbox"
                    value={menu.m_estado}
                    onChange={(e) =>
                      handleChangeInput(e, "m_estado", menu, setMenu)
                    }
                    checked={menu.m_estado}
                  />
                </div>
              </div>

              <div className="form-row mt-3 p-1 border-top border-bottom">
                <h6 className="mt-2 font-weight-bold">Selecciona menu padre</h6>
              </div>
              <Table striped borderless hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Permiso</th>
                    <th>Descripcion</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems !== false &&
                    currentItems.map((m) => (
                      <tr
                        key={m.m_id}
                        className={`${
                          menu.m_cod_padre === m.m_id
                            ? "tr-selected text-white"
                            : ""
                        }`}
                      >
                        <td>{m.m_id}</td>
                        <td>{m.m_nombre}</td>
                        <td>{m.m_descripcion}</td>
                        {/*eslint-disable-next-line*/}
                        <td>
                          <span
                            className="tr-link"
                            onClick={() => {
                              handleSelectPadre(
                                `${menu.m_cod_padre === m.m_id ? 0 : m.m_id}`
                              );
                            }}
                          >
                            {`${
                              menu.m_cod_padre === m.m_id
                                ? "Quitar"
                                : "Seleccionar"
                            }`}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <PaginationComponent
                  total={totalItems}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={paginate}
              />
            </>
          )}
          <button
            className="btn btn-primary text-uppercase mt-3 float-right"
            disabled={loading}
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = state=>{
  return{
    currentUser:state.user.currentUser
  }
}

export default connect(mapStateToProps, null)(MenuPermiso);
