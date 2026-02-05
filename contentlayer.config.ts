import { defineDocumentType, makeSource, defineNestedType } from 'contentlayer/source-files'

const Validation = defineNestedType(() => ({
  name: 'Validation',
  fields: {
    nombre: { type: 'string', required: true },
    tipo_de_validador: { type: 'enum', options: ['autoridad', 'cabildo', 'colectivo', 'líder comunitario'], required: true },
    fecha_validacion: { type: 'string', required: false },
    nota_validacion: { type: 'string', required: false }, // Para "Consenso comunitario vigente"
  }
}))

const HitoHistorico = defineNestedType(() => ({
  name: 'HitoHistorico',
  fields: {
    fecha: { type: 'string', required: true }, // Ahora permite "1970", "1970-1980", etc.
    evento: { type: 'string', required: true },
    documento_ref: { type: 'string', required: false },
  }
}))

export const TerritorioPijao = defineDocumentType(() => ({
  name: 'TerritorioPijao',
  filePathPattern: `territorios/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    nombre_oficial: { type: 'string', required: true },
    nombre_comunitario: { type: 'string', required: false },
    municipio: { type: 'string', required: true },
    estatus_legal: { type: 'string', required: true },
    hitos_historicos: { type: 'list', of: HitoHistorico, required: false },
    autoridades_actuales: { type: 'list', of: { type: 'string' }, required: false },
    tipos_de_conocimiento: {
      type: 'list',
      of: { type: 'enum', options: ['Archivo Histórico', 'Testimonio Oral', 'Producción Contemporánea'] },
      required: true
    },
    validacion: { type: 'nested', of: Validation, required: true },
    coordenadas: { type: 'json', required: false },
    nota_editorial: { type: 'string', required: false },
  },
  computedFields: {
    id: { type: 'string', resolve: (doc) => doc._raw.flattenedPath.split('/').pop() },
    url: { type: 'string', resolve: (doc) => `/territorio/${doc._raw.flattenedPath.split('/').pop()}` },
  },
}))

export const PersonaPijao = defineDocumentType(() => ({
  name: 'PersonaPijao',
  filePathPattern: `personas/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    nombre_completo: { type: 'string', required: true },
    territorio_id: { type: 'string', required: true },
    rol_comunitario: { type: 'list', of: { type: 'string' }, required: false },
    oficio_principal: { type: 'list', of: { type: 'string' }, required: false },
    tipos_de_conocimiento: {
      type: 'list',
      of: { type: 'enum', options: ['Archivo Histórico', 'Testimonio Oral', 'Producción Contemporánea'] },
      required: true
    },
    fuentes_verificacion: { type: 'list', of: { type: 'json' }, required: false },
    validacion: { type: 'nested', of: Validation, required: true },
    proyectos_ids: { type: 'list', of: { type: 'string' }, required: false },
    nota_editorial: { type: 'string', required: false },
  },
  computedFields: {
    id: { type: 'string', resolve: (doc) => doc._raw.flattenedPath.split('/').pop() },
    url: { type: 'string', resolve: (doc) => `/pijao-hoy/${doc._raw.flattenedPath.split('/').pop()}` },
  },
}))

export const ProyectoTrabajo = defineDocumentType(() => ({
  name: 'ProyectoTrabajo',
  filePathPattern: `proyectos/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    titulo: { type: 'string', required: true },
    categoria: { type: 'enum', options: ['Productivo', 'Cultural', 'Educativo', 'Ambiental', 'Político'], required: true },
    estado_actual: { type: 'enum', options: ['Activo', 'En pausa', 'Histórico/Finalizado'], required: true },
    territorio_relacion: { type: 'string', required: true },
    actores_clave: { type: 'list', of: { type: 'string' }, required: false },
    tipos_de_conocimiento: {
      type: 'list',
      of: { type: 'enum', options: ['Archivo Histórico', 'Testimonio Oral', 'Producción Contemporánea'] },
      required: true
    },
    validacion: { type: 'nested', of: Validation, required: true },
    metadatos_origen: { type: 'json', required: true },
    nota_editorial: { type: 'string', required: false },
  },
  computedFields: {
    id: { type: 'string', resolve: (doc) => doc._raw.flattenedPath.split('/').pop() },
    url: { type: 'string', resolve: (doc) => `/trabajo/${doc._raw.flattenedPath.split('/').pop()}` },
  },
}))

export const ArchivoMemoria = defineDocumentType(() => ({
  name: 'ArchivoMemoria',
  filePathPattern: `memoria/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    titulo: { type: 'string', required: true },
    tipo_archivo: { type: 'enum', options: ['Documento', 'Mapa', 'Fotografía', 'Audio', 'Vídeo'], required: true },
    año: { type: 'string', required: false },
    territorio_relacion: { type: 'string', required: false }, // slug del territorio
    persona_relacion: { type: 'string', required: false }, // slug de la persona
    fuente_original: { type: 'string', required: true },
    url_archivo: { type: 'string', required: false }, // Link a PDF o imagen
    validacion: { type: 'nested', of: Validation, required: true },
    nota_editorial: { type: 'string', required: false },
  },
  computedFields: {
    id: { type: 'string', resolve: (doc) => doc._raw.flattenedPath.split('/').pop() },
    url: { type: 'string', resolve: (doc) => `/memoria/${doc._raw.flattenedPath.split('/').pop()}` },
  },
}))

export const SaberPropio = defineDocumentType(() => ({
  name: 'SaberPropio',
  filePathPattern: `conocimiento/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    titulo: { type: 'string', required: true },
    categoria: { type: 'enum', options: ['Artesanal', 'Medicinal', 'Pedagógico', 'Agrícola', 'Sistemas de Pensamiento', 'Histórico'], required: true },
    territorios_relacionados: { type: 'list', of: { type: 'string' }, required: false },
    personas_relacionadas: { type: 'list', of: { type: 'string' }, required: false },
    tipos_de_conocimiento: {
      type: 'list',
      of: { type: 'enum', options: ['Archivo Histórico', 'Testimonio Oral', 'Producción Contemporánea'] },
      required: true
    },
    validacion: { type: 'nested', of: Validation, required: true },
    nota_editorial: { type: 'string', required: false },
  },
  computedFields: {
    id: { type: 'string', resolve: (doc) => doc._raw.flattenedPath.split('/').pop() },
    url: { type: 'string', resolve: (doc) => `/conocimiento/${doc._raw.flattenedPath.split('/').pop()}` },
  },
}))

export const Actualidad = defineDocumentType(() => ({
  name: 'Actualidad',
  filePathPattern: `actualidad/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    titulo: { type: 'string', required: true },
    fecha: { type: 'string', required: true }, // Fecha de publicación/suceso
    resumen: { type: 'string', required: true },
    territorio_relacion: { type: 'string', required: false },
    fuente: { type: 'string', required: true },
    validacion: { type: 'nested', of: Validation, required: true },
    nota_editorial: { type: 'string', required: false },
  },
  computedFields: {
    id: { type: 'string', resolve: (doc) => doc._raw.flattenedPath.split('/').pop() },
    url: { type: 'string', resolve: (doc) => `/actualidad/${doc._raw.flattenedPath.split('/').pop()}` },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [TerritorioPijao, PersonaPijao, ProyectoTrabajo, ArchivoMemoria, SaberPropio, Actualidad],
})
