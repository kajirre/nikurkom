// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var TerritorioPijao = defineDocumentType(() => ({
  name: "TerritorioPijao",
  filePathPattern: `territorios/**/*.mdx`,
  contentType: "mdx",
  fields: {
    id: { type: "string", required: true },
    nombre_oficial: { type: "string", required: true },
    nombre_comunitario: { type: "string", required: false },
    municipio: { type: "string", required: true },
    estatus_legal: { type: "string", required: true },
    hitos_historicos: {
      type: "list",
      of: {
        type: "json"
        // Documentado como objeto en la plantilla
      },
      required: false
    },
    autoridades_actuales: { type: "list", of: { type: "string" }, required: false },
    tipo_de_conocimiento: { type: "enum", options: ["Archivo Hist\xF3rico", "Testimonio Oral"], required: true },
    validacion: {
      type: "nested",
      of: defineDocumentType(() => ({
        name: "Validation",
        fields: {
          nombre: { type: "string", required: true },
          tipo_de_validador: { type: "enum", options: ["autoridad", "cabildo", "colectivo", "l\xEDder comunitario"], required: true },
          fecha_validacion: { type: "string", required: true }
        }
      })),
      required: true
    },
    coordenadas: { type: "json", required: false },
    nota_editorial: { type: "string", required: false }
    // No se mostrará en producción
  },
  computedFields: {
    url: { type: "string", resolve: (doc) => `/territorio/${doc._raw.flattenedPath.split("/").pop()}` }
  }
}));
var PersonaPijao = defineDocumentType(() => ({
  name: "PersonaPijao",
  filePathPattern: `personas/**/*.mdx`,
  contentType: "mdx",
  fields: {
    id: { type: "string", required: true },
    nombre_completo: { type: "string", required: true },
    territorio_id: { type: "string", required: true },
    rol_comunitario: { type: "list", of: { type: "string" }, required: false },
    oficio_principal: { type: "list", of: { type: "string" }, required: false },
    tipo_de_conocimiento: { type: "enum", options: ["Testimonio Oral", "Archivo Hist\xF3rico"], required: true },
    fuentes_verificacion: { type: "list", of: { type: "json" }, required: false },
    validacion: {
      type: "json",
      // Simplificado para MDX manual pero validable
      required: true
    },
    proyectos_ids: { type: "list", of: { type: "string" }, required: false },
    nota_editorial: { type: "string", required: false }
  },
  computedFields: {
    url: { type: "string", resolve: (doc) => `/pijao-hoy/${doc._raw.flattenedPath.split("/").pop()}` }
  }
}));
var ProyectoTrabajo = defineDocumentType(() => ({
  name: "ProyectoTrabajo",
  filePathPattern: `proyectos/**/*.mdx`,
  contentType: "mdx",
  fields: {
    id: { type: "string", required: true },
    titulo: { type: "string", required: true },
    categoria: { type: "enum", options: ["Productivo", "Cultural", "Educativo", "Ambiental", "Pol\xEDtico"], required: true },
    estado_actual: { type: "enum", options: ["Activo", "En pausa", "Hist\xF3rico/Finalizado"], required: true },
    territorio_relacion: { type: "string", required: true },
    actores_clave: { type: "list", of: { type: "string" }, required: false },
    tipo_de_conocimiento: { type: "string", required: true },
    validacion: { type: "json", required: true },
    metadatos_origen: { type: "json", required: true },
    nota_editorial: { type: "string", required: false }
  },
  computedFields: {
    url: { type: "string", resolve: (doc) => `/trabajo/${doc._raw.flattenedPath.split("/").pop()}` }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [TerritorioPijao, PersonaPijao, ProyectoTrabajo]
});
export {
  PersonaPijao,
  ProyectoTrabajo,
  TerritorioPijao,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-W6IYN32Z.mjs.map
