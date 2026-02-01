// contentlayer.config.ts
import { defineDocumentType, makeSource, defineNestedType } from "contentlayer/source-files";
var Validation = defineNestedType(() => ({
  name: "Validation",
  fields: {
    nombre: { type: "string", required: true },
    tipo_de_validador: { type: "enum", options: ["autoridad", "cabildo", "colectivo", "l\xEDder comunitario"], required: true },
    fecha_validacion: { type: "string", required: false },
    nota_validacion: { type: "string", required: false }
    // Para "Consenso comunitario vigente"
  }
}));
var HitoHistorico = defineNestedType(() => ({
  name: "HitoHistorico",
  fields: {
    fecha: { type: "string", required: true },
    // Ahora permite "1970", "1970-1980", etc.
    evento: { type: "string", required: true },
    documento_ref: { type: "string", required: false }
  }
}));
var TerritorioPijao = defineDocumentType(() => ({
  name: "TerritorioPijao",
  filePathPattern: `territorios/**/*.mdx`,
  contentType: "mdx",
  fields: {
    nombre_oficial: { type: "string", required: true },
    nombre_comunitario: { type: "string", required: false },
    municipio: { type: "string", required: true },
    estatus_legal: { type: "string", required: true },
    hitos_historicos: { type: "list", of: HitoHistorico, required: false },
    autoridades_actuales: { type: "list", of: { type: "string" }, required: false },
    tipos_de_conocimiento: {
      type: "list",
      of: { type: "enum", options: ["Archivo Hist\xF3rico", "Testimonio Oral", "Producci\xF3n Contempor\xE1nea"] },
      required: true
    },
    validacion: { type: "nested", of: Validation, required: true },
    coordenadas: { type: "json", required: false },
    nota_editorial: { type: "string", required: false }
  },
  computedFields: {
    id: { type: "string", resolve: (doc) => doc._raw.flattenedPath.split("/").pop() },
    url: { type: "string", resolve: (doc) => `/territorio/${doc._raw.flattenedPath.split("/").pop()}` }
  }
}));
var PersonaPijao = defineDocumentType(() => ({
  name: "PersonaPijao",
  filePathPattern: `personas/**/*.mdx`,
  contentType: "mdx",
  fields: {
    nombre_completo: { type: "string", required: true },
    territorio_id: { type: "string", required: true },
    rol_comunitario: { type: "list", of: { type: "string" }, required: false },
    oficio_principal: { type: "list", of: { type: "string" }, required: false },
    tipos_de_conocimiento: {
      type: "list",
      of: { type: "enum", options: ["Archivo Hist\xF3rico", "Testimonio Oral", "Producci\xF3n Contempor\xE1nea"] },
      required: true
    },
    fuentes_verificacion: { type: "list", of: { type: "json" }, required: false },
    validacion: { type: "nested", of: Validation, required: true },
    proyectos_ids: { type: "list", of: { type: "string" }, required: false },
    nota_editorial: { type: "string", required: false }
  },
  computedFields: {
    id: { type: "string", resolve: (doc) => doc._raw.flattenedPath.split("/").pop() },
    url: { type: "string", resolve: (doc) => `/pijao-hoy/${doc._raw.flattenedPath.split("/").pop()}` }
  }
}));
var ProyectoTrabajo = defineDocumentType(() => ({
  name: "ProyectoTrabajo",
  filePathPattern: `proyectos/**/*.mdx`,
  contentType: "mdx",
  fields: {
    titulo: { type: "string", required: true },
    categoria: { type: "enum", options: ["Productivo", "Cultural", "Educativo", "Ambiental", "Pol\xEDtico"], required: true },
    estado_actual: { type: "enum", options: ["Activo", "En pausa", "Hist\xF3rico/Finalizado"], required: true },
    territorio_relacion: { type: "string", required: true },
    actores_clave: { type: "list", of: { type: "string" }, required: false },
    tipos_de_conocimiento: {
      type: "list",
      of: { type: "enum", options: ["Archivo Hist\xF3rico", "Testimonio Oral", "Producci\xF3n Contempor\xE1nea"] },
      required: true
    },
    validacion: { type: "nested", of: Validation, required: true },
    metadatos_origen: { type: "json", required: true },
    nota_editorial: { type: "string", required: false }
  },
  computedFields: {
    id: { type: "string", resolve: (doc) => doc._raw.flattenedPath.split("/").pop() },
    url: { type: "string", resolve: (doc) => `/trabajo/${doc._raw.flattenedPath.split("/").pop()}` }
  }
}));
var ArchivoMemoria = defineDocumentType(() => ({
  name: "ArchivoMemoria",
  filePathPattern: `memoria/**/*.mdx`,
  contentType: "mdx",
  fields: {
    titulo: { type: "string", required: true },
    tipo_archivo: { type: "enum", options: ["Documento", "Mapa", "Fotograf\xEDa", "Audio", "V\xEDdeo"], required: true },
    a\u00F1o: { type: "string", required: false },
    territorio_relacion: { type: "string", required: false },
    // slug del territorio
    persona_relacion: { type: "string", required: false },
    // slug de la persona
    fuente_original: { type: "string", required: true },
    url_archivo: { type: "string", required: false },
    // Link a PDF o imagen
    validacion: { type: "nested", of: Validation, required: true },
    nota_editorial: { type: "string", required: false }
  },
  computedFields: {
    id: { type: "string", resolve: (doc) => doc._raw.flattenedPath.split("/").pop() },
    url: { type: "string", resolve: (doc) => `/memoria/${doc._raw.flattenedPath.split("/").pop()}` }
  }
}));
var SaberPropio = defineDocumentType(() => ({
  name: "SaberPropio",
  filePathPattern: `conocimiento/**/*.mdx`,
  contentType: "mdx",
  fields: {
    titulo: { type: "string", required: true },
    categoria: { type: "enum", options: ["Artesanal", "Medicinal", "Pedag\xF3gico", "Agr\xEDcola", "Sistemas de Pensamiento"], required: true },
    territorios_relacionados: { type: "list", of: { type: "string" }, required: false },
    personas_relacionadas: { type: "list", of: { type: "string" }, required: false },
    tipos_de_conocimiento: {
      type: "list",
      of: { type: "enum", options: ["Archivo Hist\xF3rico", "Testimonio Oral", "Producci\xF3n Contempor\xE1nea"] },
      required: true
    },
    validacion: { type: "nested", of: Validation, required: true },
    nota_editorial: { type: "string", required: false }
  },
  computedFields: {
    id: { type: "string", resolve: (doc) => doc._raw.flattenedPath.split("/").pop() },
    url: { type: "string", resolve: (doc) => `/conocimiento/${doc._raw.flattenedPath.split("/").pop()}` }
  }
}));
var Actualidad = defineDocumentType(() => ({
  name: "Actualidad",
  filePathPattern: `actualidad/**/*.mdx`,
  contentType: "mdx",
  fields: {
    titulo: { type: "string", required: true },
    fecha: { type: "string", required: true },
    // Fecha de publicación/suceso
    resumen: { type: "string", required: true },
    territorio_relacion: { type: "string", required: false },
    fuente: { type: "string", required: true },
    validacion: { type: "nested", of: Validation, required: true },
    nota_editorial: { type: "string", required: false }
  },
  computedFields: {
    id: { type: "string", resolve: (doc) => doc._raw.flattenedPath.split("/").pop() },
    url: { type: "string", resolve: (doc) => `/actualidad/${doc._raw.flattenedPath.split("/").pop()}` }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [TerritorioPijao, PersonaPijao, ProyectoTrabajo, ArchivoMemoria, SaberPropio, Actualidad]
});
export {
  Actualidad,
  ArchivoMemoria,
  PersonaPijao,
  ProyectoTrabajo,
  SaberPropio,
  TerritorioPijao,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-I44VCPWN.mjs.map
