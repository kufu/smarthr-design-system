/* eslint-disable */


declare namespace GatsbyTypes {

type Maybe<T> = T | null;
type InputMaybe<T> = T | null;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  /** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
  ID: string;
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: string;
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: boolean;
  /** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  Int: number;
  /** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: string;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

type Airtable = Node & {
  readonly children: ReadonlyArray<Node>;
  readonly data: Maybe<AirtableData>;
  readonly id: Scalars['ID'];
  readonly internal: Internal;
  readonly parent: Maybe<Node>;
  readonly recordId: Maybe<Scalars['String']>;
  readonly rowIndex: Maybe<Scalars['Int']>;
  readonly table: Maybe<Scalars['String']>;
};

type AirtableConnection = {
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly edges: ReadonlyArray<AirtableEdge>;
  readonly group: ReadonlyArray<AirtableGroupConnection>;
  readonly max: Maybe<Scalars['Float']>;
  readonly min: Maybe<Scalars['Float']>;
  readonly nodes: ReadonlyArray<Airtable>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars['Float']>;
  readonly totalCount: Scalars['Int'];
};


type AirtableConnection_distinctArgs = {
  field: AirtableFieldsEnum;
};


type AirtableConnection_groupArgs = {
  field: AirtableFieldsEnum;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
};


type AirtableConnection_maxArgs = {
  field: AirtableFieldsEnum;
};


type AirtableConnection_minArgs = {
  field: AirtableFieldsEnum;
};


type AirtableConnection_sumArgs = {
  field: AirtableFieldsEnum;
};

type AirtableData = {
  readonly _50_______: Maybe<Scalars['String']>;
  readonly add_next_to_textlint: Maybe<Scalars['Boolean']>;
  readonly assign: Maybe<Scalars['String']>;
  readonly basic_reason: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly data: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly description: Maybe<Scalars['String']>;
  readonly discussion: Maybe<Scalars['String']>;
  readonly expected: Maybe<Scalars['String']>;
  readonly label: Maybe<Scalars['String']>;
  readonly name: Maybe<Scalars['String']>;
  readonly ng_example: Maybe<Scalars['String']>;
  readonly ok_example: Maybe<Scalars['String']>;
  readonly order: Maybe<Scalars['Int']>;
  readonly pattern: Maybe<Scalars['String']>;
  readonly prh: Maybe<Scalars['String']>;
  readonly reason: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly record_id: Maybe<Scalars['String']>;
  readonly slack: Maybe<Scalars['Boolean']>;
  readonly source: Maybe<Scalars['String']>;
  readonly spec_from: Maybe<Scalars['String']>;
  readonly spec_to: Maybe<Scalars['String']>;
  readonly use_textlint: Maybe<Scalars['Boolean']>;
};

type AirtableDataFilterInput = {
  readonly _50_______: InputMaybe<StringQueryOperatorInput>;
  readonly add_next_to_textlint: InputMaybe<BooleanQueryOperatorInput>;
  readonly assign: InputMaybe<StringQueryOperatorInput>;
  readonly basic_reason: InputMaybe<StringQueryOperatorInput>;
  readonly data: InputMaybe<StringQueryOperatorInput>;
  readonly description: InputMaybe<StringQueryOperatorInput>;
  readonly discussion: InputMaybe<StringQueryOperatorInput>;
  readonly expected: InputMaybe<StringQueryOperatorInput>;
  readonly label: InputMaybe<StringQueryOperatorInput>;
  readonly name: InputMaybe<StringQueryOperatorInput>;
  readonly ng_example: InputMaybe<StringQueryOperatorInput>;
  readonly ok_example: InputMaybe<StringQueryOperatorInput>;
  readonly order: InputMaybe<IntQueryOperatorInput>;
  readonly pattern: InputMaybe<StringQueryOperatorInput>;
  readonly prh: InputMaybe<StringQueryOperatorInput>;
  readonly reason: InputMaybe<StringQueryOperatorInput>;
  readonly record_id: InputMaybe<StringQueryOperatorInput>;
  readonly slack: InputMaybe<BooleanQueryOperatorInput>;
  readonly source: InputMaybe<StringQueryOperatorInput>;
  readonly spec_from: InputMaybe<StringQueryOperatorInput>;
  readonly spec_to: InputMaybe<StringQueryOperatorInput>;
  readonly use_textlint: InputMaybe<BooleanQueryOperatorInput>;
};

type AirtableEdge = {
  readonly next: Maybe<Airtable>;
  readonly node: Airtable;
  readonly previous: Maybe<Airtable>;
};

type AirtableFieldsEnum =
  | 'children'
  | 'children.children'
  | 'children.children.children'
  | 'children.children.children.children'
  | 'children.children.children.id'
  | 'children.children.id'
  | 'children.children.internal.content'
  | 'children.children.internal.contentDigest'
  | 'children.children.internal.contentFilePath'
  | 'children.children.internal.description'
  | 'children.children.internal.fieldOwners'
  | 'children.children.internal.ignoreType'
  | 'children.children.internal.mediaType'
  | 'children.children.internal.owner'
  | 'children.children.internal.type'
  | 'children.children.parent.children'
  | 'children.children.parent.id'
  | 'children.id'
  | 'children.internal.content'
  | 'children.internal.contentDigest'
  | 'children.internal.contentFilePath'
  | 'children.internal.description'
  | 'children.internal.fieldOwners'
  | 'children.internal.ignoreType'
  | 'children.internal.mediaType'
  | 'children.internal.owner'
  | 'children.internal.type'
  | 'children.parent.children'
  | 'children.parent.children.children'
  | 'children.parent.children.id'
  | 'children.parent.id'
  | 'children.parent.internal.content'
  | 'children.parent.internal.contentDigest'
  | 'children.parent.internal.contentFilePath'
  | 'children.parent.internal.description'
  | 'children.parent.internal.fieldOwners'
  | 'children.parent.internal.ignoreType'
  | 'children.parent.internal.mediaType'
  | 'children.parent.internal.owner'
  | 'children.parent.internal.type'
  | 'children.parent.parent.children'
  | 'children.parent.parent.id'
  | 'data._50_______'
  | 'data.add_next_to_textlint'
  | 'data.assign'
  | 'data.basic_reason'
  | 'data.data'
  | 'data.description'
  | 'data.discussion'
  | 'data.expected'
  | 'data.label'
  | 'data.name'
  | 'data.ng_example'
  | 'data.ok_example'
  | 'data.order'
  | 'data.pattern'
  | 'data.prh'
  | 'data.reason'
  | 'data.record_id'
  | 'data.slack'
  | 'data.source'
  | 'data.spec_from'
  | 'data.spec_to'
  | 'data.use_textlint'
  | 'id'
  | 'internal.content'
  | 'internal.contentDigest'
  | 'internal.contentFilePath'
  | 'internal.description'
  | 'internal.fieldOwners'
  | 'internal.ignoreType'
  | 'internal.mediaType'
  | 'internal.owner'
  | 'internal.type'
  | 'parent.children'
  | 'parent.children.children'
  | 'parent.children.children.children'
  | 'parent.children.children.id'
  | 'parent.children.id'
  | 'parent.children.internal.content'
  | 'parent.children.internal.contentDigest'
  | 'parent.children.internal.contentFilePath'
  | 'parent.children.internal.description'
  | 'parent.children.internal.fieldOwners'
  | 'parent.children.internal.ignoreType'
  | 'parent.children.internal.mediaType'
  | 'parent.children.internal.owner'
  | 'parent.children.internal.type'
  | 'parent.children.parent.children'
  | 'parent.children.parent.id'
  | 'parent.id'
  | 'parent.internal.content'
  | 'parent.internal.contentDigest'
  | 'parent.internal.contentFilePath'
  | 'parent.internal.description'
  | 'parent.internal.fieldOwners'
  | 'parent.internal.ignoreType'
  | 'parent.internal.mediaType'
  | 'parent.internal.owner'
  | 'parent.internal.type'
  | 'parent.parent.children'
  | 'parent.parent.children.children'
  | 'parent.parent.children.id'
  | 'parent.parent.id'
  | 'parent.parent.internal.content'
  | 'parent.parent.internal.contentDigest'
  | 'parent.parent.internal.contentFilePath'
  | 'parent.parent.internal.description'
  | 'parent.parent.internal.fieldOwners'
  | 'parent.parent.internal.ignoreType'
  | 'parent.parent.internal.mediaType'
  | 'parent.parent.internal.owner'
  | 'parent.parent.internal.type'
  | 'parent.parent.parent.children'
  | 'parent.parent.parent.id'
  | 'recordId'
  | 'rowIndex'
  | 'table';

type AirtableFilterInput = {
  readonly children: InputMaybe<NodeFilterListInput>;
  readonly data: InputMaybe<AirtableDataFilterInput>;
  readonly id: InputMaybe<StringQueryOperatorInput>;
  readonly internal: InputMaybe<InternalFilterInput>;
  readonly parent: InputMaybe<NodeFilterInput>;
  readonly recordId: InputMaybe<StringQueryOperatorInput>;
  readonly rowIndex: InputMaybe<IntQueryOperatorInput>;
  readonly table: InputMaybe<StringQueryOperatorInput>;
};

type AirtableGroupConnection = {
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly edges: ReadonlyArray<AirtableEdge>;
  readonly field: Scalars['String'];
  readonly fieldValue: Maybe<Scalars['String']>;
  readonly group: ReadonlyArray<AirtableGroupConnection>;
  readonly max: Maybe<Scalars['Float']>;
  readonly min: Maybe<Scalars['Float']>;
  readonly nodes: ReadonlyArray<Airtable>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars['Float']>;
  readonly totalCount: Scalars['Int'];
};


type AirtableGroupConnection_distinctArgs = {
  field: AirtableFieldsEnum;
};


type AirtableGroupConnection_groupArgs = {
  field: AirtableFieldsEnum;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
};


type AirtableGroupConnection_maxArgs = {
  field: AirtableFieldsEnum;
};


type AirtableGroupConnection_minArgs = {
  field: AirtableFieldsEnum;
};


type AirtableGroupConnection_sumArgs = {
  field: AirtableFieldsEnum;
};

type AirtableSortInput = {
  readonly fields: InputMaybe<ReadonlyArray<InputMaybe<AirtableFieldsEnum>>>;
  readonly order: InputMaybe<ReadonlyArray<InputMaybe<SortOrderEnum>>>;
};

type BooleanQueryOperatorInput = {
  readonly eq: InputMaybe<Scalars['Boolean']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Boolean']>>>;
  readonly ne: InputMaybe<Scalars['Boolean']>;
  readonly nin: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Boolean']>>>;
};

type DateQueryOperatorInput = {
  readonly eq: InputMaybe<Scalars['Date']>;
  readonly gt: InputMaybe<Scalars['Date']>;
  readonly gte: InputMaybe<Scalars['Date']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Date']>>>;
  readonly lt: InputMaybe<Scalars['Date']>;
  readonly lte: InputMaybe<Scalars['Date']>;
  readonly ne: InputMaybe<Scalars['Date']>;
  readonly nin: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Date']>>>;
};

type Directory = Node & {
  readonly absolutePath: Scalars['String'];
  readonly accessTime: Scalars['Date'];
  readonly atime: Scalars['Date'];
  readonly atimeMs: Scalars['Float'];
  readonly base: Scalars['String'];
  readonly birthTime: Scalars['Date'];
  /** @deprecated Use `birthTime` instead */
  readonly birthtime: Maybe<Scalars['Date']>;
  /** @deprecated Use `birthTime` instead */
  readonly birthtimeMs: Maybe<Scalars['Float']>;
  readonly changeTime: Scalars['Date'];
  readonly children: ReadonlyArray<Node>;
  readonly ctime: Scalars['Date'];
  readonly ctimeMs: Scalars['Float'];
  readonly dev: Scalars['Int'];
  readonly dir: Scalars['String'];
  readonly ext: Scalars['String'];
  readonly extension: Scalars['String'];
  readonly gid: Scalars['Int'];
  readonly id: Scalars['ID'];
  readonly ino: Scalars['Float'];
  readonly internal: Internal;
  readonly mode: Scalars['Int'];
  readonly modifiedTime: Scalars['Date'];
  readonly mtime: Scalars['Date'];
  readonly mtimeMs: Scalars['Float'];
  readonly name: Scalars['String'];
  readonly nlink: Scalars['Int'];
  readonly parent: Maybe<Node>;
  readonly prettySize: Scalars['String'];
  readonly rdev: Scalars['Int'];
  readonly relativeDirectory: Scalars['String'];
  readonly relativePath: Scalars['String'];
  readonly root: Scalars['String'];
  readonly size: Scalars['Int'];
  readonly sourceInstanceName: Scalars['String'];
  readonly uid: Scalars['Int'];
};


type Directory_accessTimeArgs = {
  difference: InputMaybe<Scalars['String']>;
  formatString: InputMaybe<Scalars['String']>;
  fromNow: InputMaybe<Scalars['Boolean']>;
  locale: InputMaybe<Scalars['String']>;
};


type Directory_atimeArgs = {
  difference: InputMaybe<Scalars['String']>;
  formatString: InputMaybe<Scalars['String']>;
  fromNow: InputMaybe<Scalars['Boolean']>;
  locale: InputMaybe<Scalars['String']>;
};


type Directory_birthTimeArgs = {
  difference: InputMaybe<Scalars['String']>;
  formatString: InputMaybe<Scalars['String']>;
  fromNow: InputMaybe<Scalars['Boolean']>;
  locale: InputMaybe<Scalars['String']>;
};


type Directory_changeTimeArgs = {
  difference: InputMaybe<Scalars['String']>;
  formatString: InputMaybe<Scalars['String']>;
  fromNow: InputMaybe<Scalars['Boolean']>;
  locale: InputMaybe<Scalars['String']>;
};


type Directory_ctimeArgs = {
  difference: InputMaybe<Scalars['String']>;
  formatString: InputMaybe<Scalars['String']>;
  fromNow: InputMaybe<Scalars['Boolean']>;
  locale: InputMaybe<Scalars['String']>;
};


type Directory_modifiedTimeArgs = {
  difference: InputMaybe<Scalars['String']>;
  formatString: InputMaybe<Scalars['String']>;
  fromNow: InputMaybe<Scalars['Boolean']>;
  locale: InputMaybe<Scalars['String']>;
};


type Directory_mtimeArgs = {
  difference: InputMaybe<Scalars['String']>;
  formatString: InputMaybe<Scalars['String']>;
  fromNow: InputMaybe<Scalars['Boolean']>;
  locale: InputMaybe<Scalars['String']>;
};

type DirectoryConnection = {
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly edges: ReadonlyArray<DirectoryEdge>;
  readonly group: ReadonlyArray<DirectoryGroupConnection>;
  readonly max: Maybe<Scalars['Float']>;
  readonly min: Maybe<Scalars['Float']>;
  readonly nodes: ReadonlyArray<Directory>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars['Float']>;
  readonly totalCount: Scalars['Int'];
};


type DirectoryConnection_distinctArgs = {
  field: DirectoryFieldsEnum;
};


type DirectoryConnection_groupArgs = {
  field: DirectoryFieldsEnum;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
};


type DirectoryConnection_maxArgs = {
  field: DirectoryFieldsEnum;
};


type DirectoryConnection_minArgs = {
  field: DirectoryFieldsEnum;
};


type DirectoryConnection_sumArgs = {
  field: DirectoryFieldsEnum;
};

type DirectoryEdge = {
  readonly next: Maybe<Directory>;
  readonly node: Directory;
  readonly previous: Maybe<Directory>;
};

type DirectoryFieldsEnum =
  | 'absolutePath'
  | 'accessTime'
  | 'atime'
  | 'atimeMs'
  | 'base'
  | 'birthTime'
  | 'birthtime'
  | 'birthtimeMs'
  | 'changeTime'
  | 'children'
  | 'children.children'
  | 'children.children.children'
  | 'children.children.children.children'
  | 'children.children.children.id'
  | 'children.children.id'
  | 'children.children.internal.content'
  | 'children.children.internal.contentDigest'
  | 'children.children.internal.contentFilePath'
  | 'children.children.internal.description'
  | 'children.children.internal.fieldOwners'
  | 'children.children.internal.ignoreType'
  | 'children.children.internal.mediaType'
  | 'children.children.internal.owner'
  | 'children.children.internal.type'
  | 'children.children.parent.children'
  | 'children.children.parent.id'
  | 'children.id'
  | 'children.internal.content'
  | 'children.internal.contentDigest'
  | 'children.internal.contentFilePath'
  | 'children.internal.description'
  | 'children.internal.fieldOwners'
  | 'children.internal.ignoreType'
  | 'children.internal.mediaType'
  | 'children.internal.owner'
  | 'children.internal.type'
  | 'children.parent.children'
  | 'children.parent.children.children'
  | 'children.parent.children.id'
  | 'children.parent.id'
  | 'children.parent.internal.content'
  | 'children.parent.internal.contentDigest'
  | 'children.parent.internal.contentFilePath'
  | 'children.parent.internal.description'
  | 'children.parent.internal.fieldOwners'
  | 'children.parent.internal.ignoreType'
  | 'children.parent.internal.mediaType'
  | 'children.parent.internal.owner'
  | 'children.parent.internal.type'
  | 'children.parent.parent.children'
  | 'children.parent.parent.id'
  | 'ctime'
  | 'ctimeMs'
  | 'dev'
  | 'dir'
  | 'ext'
  | 'extension'
  | 'gid'
  | 'id'
  | 'ino'
  | 'internal.content'
  | 'internal.contentDigest'
  | 'internal.contentFilePath'
  | 'internal.description'
  | 'internal.fieldOwners'
  | 'internal.ignoreType'
  | 'internal.mediaType'
  | 'internal.owner'
  | 'internal.type'
  | 'mode'
  | 'modifiedTime'
  | 'mtime'
  | 'mtimeMs'
  | 'name'
  | 'nlink'
  | 'parent.children'
  | 'parent.children.children'
  | 'parent.children.children.children'
  | 'parent.children.children.id'
  | 'parent.children.id'
  | 'parent.children.internal.content'
  | 'parent.children.internal.contentDigest'
  | 'parent.children.internal.contentFilePath'
  | 'parent.children.internal.description'
  | 'parent.children.internal.fieldOwners'
  | 'parent.children.internal.ignoreType'
  | 'parent.children.internal.mediaType'
  | 'parent.children.internal.owner'
  | 'parent.children.internal.type'
  | 'parent.children.parent.children'
  | 'parent.children.parent.id'
  | 'parent.id'
  | 'parent.internal.content'
  | 'parent.internal.contentDigest'
  | 'parent.internal.contentFilePath'
  | 'parent.internal.description'
  | 'parent.internal.fieldOwners'
  | 'parent.internal.ignoreType'
  | 'parent.internal.mediaType'
  | 'parent.internal.owner'
  | 'parent.internal.type'
  | 'parent.parent.children'
  | 'parent.parent.children.children'
  | 'parent.parent.children.id'
  | 'parent.parent.id'
  | 'parent.parent.internal.content'
  | 'parent.parent.internal.contentDigest'
  | 'parent.parent.internal.contentFilePath'
  | 'parent.parent.internal.description'
  | 'parent.parent.internal.fieldOwners'
  | 'parent.parent.internal.ignoreType'
  | 'parent.parent.internal.mediaType'
  | 'parent.parent.internal.owner'
  | 'parent.parent.internal.type'
  | 'parent.parent.parent.children'
  | 'parent.parent.parent.id'
  | 'prettySize'
  | 'rdev'
  | 'relativeDirectory'
  | 'relativePath'
  | 'root'
  | 'size'
  | 'sourceInstanceName'
  | 'uid';

type DirectoryFilterInput = {
  readonly absolutePath: InputMaybe<StringQueryOperatorInput>;
  readonly accessTime: InputMaybe<DateQueryOperatorInput>;
  readonly atime: InputMaybe<DateQueryOperatorInput>;
  readonly atimeMs: InputMaybe<FloatQueryOperatorInput>;
  readonly base: InputMaybe<StringQueryOperatorInput>;
  readonly birthTime: InputMaybe<DateQueryOperatorInput>;
  readonly birthtime: InputMaybe<DateQueryOperatorInput>;
  readonly birthtimeMs: InputMaybe<FloatQueryOperatorInput>;
  readonly changeTime: InputMaybe<DateQueryOperatorInput>;
  readonly children: InputMaybe<NodeFilterListInput>;
  readonly ctime: InputMaybe<DateQueryOperatorInput>;
  readonly ctimeMs: InputMaybe<FloatQueryOperatorInput>;
  readonly dev: InputMaybe<IntQueryOperatorInput>;
  readonly dir: InputMaybe<StringQueryOperatorInput>;
  readonly ext: InputMaybe<StringQueryOperatorInput>;
  readonly extension: InputMaybe<StringQueryOperatorInput>;
  readonly gid: InputMaybe<IntQueryOperatorInput>;
  readonly id: InputMaybe<StringQueryOperatorInput>;
  readonly ino: InputMaybe<FloatQueryOperatorInput>;
  readonly internal: InputMaybe<InternalFilterInput>;
  readonly mode: InputMaybe<IntQueryOperatorInput>;
  readonly modifiedTime: InputMaybe<DateQueryOperatorInput>;
  readonly mtime: InputMaybe<DateQueryOperatorInput>;
  readonly mtimeMs: InputMaybe<FloatQueryOperatorInput>;
  readonly name: InputMaybe<StringQueryOperatorInput>;
  readonly nlink: InputMaybe<IntQueryOperatorInput>;
  readonly parent: InputMaybe<NodeFilterInput>;
  readonly prettySize: InputMaybe<StringQueryOperatorInput>;
  readonly rdev: InputMaybe<IntQueryOperatorInput>;
  readonly relativeDirectory: InputMaybe<StringQueryOperatorInput>;
  readonly relativePath: InputMaybe<StringQueryOperatorInput>;
  readonly root: InputMaybe<StringQueryOperatorInput>;
  readonly size: InputMaybe<IntQueryOperatorInput>;
  readonly sourceInstanceName: InputMaybe<StringQueryOperatorInput>;
  readonly uid: InputMaybe<IntQueryOperatorInput>;
};

type DirectoryGroupConnection = {
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly edges: ReadonlyArray<DirectoryEdge>;
  readonly field: Scalars['String'];
  readonly fieldValue: Maybe<Scalars['String']>;
  readonly group: ReadonlyArray<DirectoryGroupConnection>;
  readonly max: Maybe<Scalars['Float']>;
  readonly min: Maybe<Scalars['Float']>;
  readonly nodes: ReadonlyArray<Directory>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars['Float']>;
  readonly totalCount: Scalars['Int'];
};


type DirectoryGroupConnection_distinctArgs = {
  field: DirectoryFieldsEnum;
};


type DirectoryGroupConnection_groupArgs = {
  field: DirectoryFieldsEnum;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
};


type DirectoryGroupConnection_maxArgs = {
  field: DirectoryFieldsEnum;
};


type DirectoryGroupConnection_minArgs = {
  field: DirectoryFieldsEnum;
};


type DirectoryGroupConnection_sumArgs = {
  field: DirectoryFieldsEnum;
};

type DirectorySortInput = {
  readonly fields: InputMaybe<ReadonlyArray<InputMaybe<DirectoryFieldsEnum>>>;
  readonly order: InputMaybe<ReadonlyArray<InputMaybe<SortOrderEnum>>>;
};

type File = Node & {
  readonly absolutePath: Scalars['String'];
  readonly accessTime: Scalars['Date'];
  readonly atime: Scalars['Date'];
  readonly atimeMs: Scalars['Float'];
  readonly base: Scalars['String'];
  readonly birthTime: Scalars['Date'];
  /** @deprecated Use `birthTime` instead */
  readonly birthtime: Maybe<Scalars['Date']>;
  /** @deprecated Use `birthTime` instead */
  readonly birthtimeMs: Maybe<Scalars['Float']>;
  readonly blksize: Maybe<Scalars['Int']>;
  readonly blocks: Maybe<Scalars['Int']>;
  readonly changeTime: Scalars['Date'];
  /** Returns the first child node of type Mdx or null if there are no children of given type on this node */
  readonly childMdx: Maybe<Mdx>;
  readonly children: ReadonlyArray<Node>;
  /** Returns all children nodes filtered by type Mdx */
  readonly childrenMdx: Maybe<ReadonlyArray<Maybe<Mdx>>>;
  readonly ctime: Scalars['Date'];
  readonly ctimeMs: Scalars['Float'];
  readonly dev: Scalars['Int'];
  readonly dir: Scalars['String'];
  readonly ext: Scalars['String'];
  readonly extension: Scalars['String'];
  readonly gid: Scalars['Int'];
  readonly id: Scalars['ID'];
  readonly ino: Scalars['Float'];
  readonly internal: Internal;
  readonly mode: Scalars['Int'];
  readonly modifiedTime: Scalars['Date'];
  readonly mtime: Scalars['Date'];
  readonly mtimeMs: Scalars['Float'];
  readonly name: Scalars['String'];
  readonly nlink: Scalars['Int'];
  readonly parent: Maybe<Node>;
  readonly prettySize: Scalars['String'];
  /** Copy file to static directory and return public url to it */
  readonly publicURL: Maybe<Scalars['String']>;
  readonly rdev: Scalars['Int'];
  readonly relativeDirectory: Scalars['String'];
  readonly relativePath: Scalars['String'];
  readonly root: Scalars['String'];
  readonly size: Scalars['Int'];
  readonly sourceInstanceName: Scalars['String'];
  readonly uid: Scalars['Int'];
};


type File_accessTimeArgs = {
  difference: InputMaybe<Scalars['String']>;
  formatString: InputMaybe<Scalars['String']>;
  fromNow: InputMaybe<Scalars['Boolean']>;
  locale: InputMaybe<Scalars['String']>;
};


type File_atimeArgs = {
  difference: InputMaybe<Scalars['String']>;
  formatString: InputMaybe<Scalars['String']>;
  fromNow: InputMaybe<Scalars['Boolean']>;
  locale: InputMaybe<Scalars['String']>;
};


type File_birthTimeArgs = {
  difference: InputMaybe<Scalars['String']>;
  formatString: InputMaybe<Scalars['String']>;
  fromNow: InputMaybe<Scalars['Boolean']>;
  locale: InputMaybe<Scalars['String']>;
};


type File_changeTimeArgs = {
  difference: InputMaybe<Scalars['String']>;
  formatString: InputMaybe<Scalars['String']>;
  fromNow: InputMaybe<Scalars['Boolean']>;
  locale: InputMaybe<Scalars['String']>;
};


type File_ctimeArgs = {
  difference: InputMaybe<Scalars['String']>;
  formatString: InputMaybe<Scalars['String']>;
  fromNow: InputMaybe<Scalars['Boolean']>;
  locale: InputMaybe<Scalars['String']>;
};


type File_modifiedTimeArgs = {
  difference: InputMaybe<Scalars['String']>;
  formatString: InputMaybe<Scalars['String']>;
  fromNow: InputMaybe<Scalars['Boolean']>;
  locale: InputMaybe<Scalars['String']>;
};


type File_mtimeArgs = {
  difference: InputMaybe<Scalars['String']>;
  formatString: InputMaybe<Scalars['String']>;
  fromNow: InputMaybe<Scalars['Boolean']>;
  locale: InputMaybe<Scalars['String']>;
};

type FileConnection = {
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly edges: ReadonlyArray<FileEdge>;
  readonly group: ReadonlyArray<FileGroupConnection>;
  readonly max: Maybe<Scalars['Float']>;
  readonly min: Maybe<Scalars['Float']>;
  readonly nodes: ReadonlyArray<File>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars['Float']>;
  readonly totalCount: Scalars['Int'];
};


type FileConnection_distinctArgs = {
  field: FileFieldsEnum;
};


type FileConnection_groupArgs = {
  field: FileFieldsEnum;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
};


type FileConnection_maxArgs = {
  field: FileFieldsEnum;
};


type FileConnection_minArgs = {
  field: FileFieldsEnum;
};


type FileConnection_sumArgs = {
  field: FileFieldsEnum;
};

type FileEdge = {
  readonly next: Maybe<File>;
  readonly node: File;
  readonly previous: Maybe<File>;
};

type FileFieldsEnum =
  | 'absolutePath'
  | 'accessTime'
  | 'atime'
  | 'atimeMs'
  | 'base'
  | 'birthTime'
  | 'birthtime'
  | 'birthtimeMs'
  | 'blksize'
  | 'blocks'
  | 'changeTime'
  | 'childMdx.body'
  | 'childMdx.children'
  | 'childMdx.children.children'
  | 'childMdx.children.children.children'
  | 'childMdx.children.children.id'
  | 'childMdx.children.id'
  | 'childMdx.children.internal.content'
  | 'childMdx.children.internal.contentDigest'
  | 'childMdx.children.internal.contentFilePath'
  | 'childMdx.children.internal.description'
  | 'childMdx.children.internal.fieldOwners'
  | 'childMdx.children.internal.ignoreType'
  | 'childMdx.children.internal.mediaType'
  | 'childMdx.children.internal.owner'
  | 'childMdx.children.internal.type'
  | 'childMdx.children.parent.children'
  | 'childMdx.children.parent.id'
  | 'childMdx.excerpt'
  | 'childMdx.fields.category'
  | 'childMdx.fields.hierarchy'
  | 'childMdx.fields.slug'
  | 'childMdx.fields.storyData.code'
  | 'childMdx.fields.storyData.groupPath'
  | 'childMdx.fields.storyData.storyItems'
  | 'childMdx.fileAbsolutePath'
  | 'childMdx.frontmatter.author'
  | 'childMdx.frontmatter.date'
  | 'childMdx.frontmatter.description'
  | 'childMdx.frontmatter.order'
  | 'childMdx.frontmatter.smarthr_ui'
  | 'childMdx.frontmatter.storyName'
  | 'childMdx.frontmatter.title'
  | 'childMdx.headings'
  | 'childMdx.headings.depth'
  | 'childMdx.headings.value'
  | 'childMdx.html'
  | 'childMdx.id'
  | 'childMdx.internal.content'
  | 'childMdx.internal.contentDigest'
  | 'childMdx.internal.contentFilePath'
  | 'childMdx.internal.description'
  | 'childMdx.internal.fieldOwners'
  | 'childMdx.internal.ignoreType'
  | 'childMdx.internal.mediaType'
  | 'childMdx.internal.owner'
  | 'childMdx.internal.type'
  | 'childMdx.mdxAST'
  | 'childMdx.parent.children'
  | 'childMdx.parent.children.children'
  | 'childMdx.parent.children.id'
  | 'childMdx.parent.id'
  | 'childMdx.parent.internal.content'
  | 'childMdx.parent.internal.contentDigest'
  | 'childMdx.parent.internal.contentFilePath'
  | 'childMdx.parent.internal.description'
  | 'childMdx.parent.internal.fieldOwners'
  | 'childMdx.parent.internal.ignoreType'
  | 'childMdx.parent.internal.mediaType'
  | 'childMdx.parent.internal.owner'
  | 'childMdx.parent.internal.type'
  | 'childMdx.parent.parent.children'
  | 'childMdx.parent.parent.id'
  | 'childMdx.rawBody'
  | 'childMdx.slug'
  | 'childMdx.tableOfContents'
  | 'childMdx.timeToRead'
  | 'childMdx.wordCount.paragraphs'
  | 'childMdx.wordCount.sentences'
  | 'childMdx.wordCount.words'
  | 'children'
  | 'childrenMdx'
  | 'childrenMdx.body'
  | 'childrenMdx.children'
  | 'childrenMdx.children.children'
  | 'childrenMdx.children.children.children'
  | 'childrenMdx.children.children.id'
  | 'childrenMdx.children.id'
  | 'childrenMdx.children.internal.content'
  | 'childrenMdx.children.internal.contentDigest'
  | 'childrenMdx.children.internal.contentFilePath'
  | 'childrenMdx.children.internal.description'
  | 'childrenMdx.children.internal.fieldOwners'
  | 'childrenMdx.children.internal.ignoreType'
  | 'childrenMdx.children.internal.mediaType'
  | 'childrenMdx.children.internal.owner'
  | 'childrenMdx.children.internal.type'
  | 'childrenMdx.children.parent.children'
  | 'childrenMdx.children.parent.id'
  | 'childrenMdx.excerpt'
  | 'childrenMdx.fields.category'
  | 'childrenMdx.fields.hierarchy'
  | 'childrenMdx.fields.slug'
  | 'childrenMdx.fields.storyData.code'
  | 'childrenMdx.fields.storyData.groupPath'
  | 'childrenMdx.fields.storyData.storyItems'
  | 'childrenMdx.fileAbsolutePath'
  | 'childrenMdx.frontmatter.author'
  | 'childrenMdx.frontmatter.date'
  | 'childrenMdx.frontmatter.description'
  | 'childrenMdx.frontmatter.order'
  | 'childrenMdx.frontmatter.smarthr_ui'
  | 'childrenMdx.frontmatter.storyName'
  | 'childrenMdx.frontmatter.title'
  | 'childrenMdx.headings'
  | 'childrenMdx.headings.depth'
  | 'childrenMdx.headings.value'
  | 'childrenMdx.html'
  | 'childrenMdx.id'
  | 'childrenMdx.internal.content'
  | 'childrenMdx.internal.contentDigest'
  | 'childrenMdx.internal.contentFilePath'
  | 'childrenMdx.internal.description'
  | 'childrenMdx.internal.fieldOwners'
  | 'childrenMdx.internal.ignoreType'
  | 'childrenMdx.internal.mediaType'
  | 'childrenMdx.internal.owner'
  | 'childrenMdx.internal.type'
  | 'childrenMdx.mdxAST'
  | 'childrenMdx.parent.children'
  | 'childrenMdx.parent.children.children'
  | 'childrenMdx.parent.children.id'
  | 'childrenMdx.parent.id'
  | 'childrenMdx.parent.internal.content'
  | 'childrenMdx.parent.internal.contentDigest'
  | 'childrenMdx.parent.internal.contentFilePath'
  | 'childrenMdx.parent.internal.description'
  | 'childrenMdx.parent.internal.fieldOwners'
  | 'childrenMdx.parent.internal.ignoreType'
  | 'childrenMdx.parent.internal.mediaType'
  | 'childrenMdx.parent.internal.owner'
  | 'childrenMdx.parent.internal.type'
  | 'childrenMdx.parent.parent.children'
  | 'childrenMdx.parent.parent.id'
  | 'childrenMdx.rawBody'
  | 'childrenMdx.slug'
  | 'childrenMdx.tableOfContents'
  | 'childrenMdx.timeToRead'
  | 'childrenMdx.wordCount.paragraphs'
  | 'childrenMdx.wordCount.sentences'
  | 'childrenMdx.wordCount.words'
  | 'children.children'
  | 'children.children.children'
  | 'children.children.children.children'
  | 'children.children.children.id'
  | 'children.children.id'
  | 'children.children.internal.content'
  | 'children.children.internal.contentDigest'
  | 'children.children.internal.contentFilePath'
  | 'children.children.internal.description'
  | 'children.children.internal.fieldOwners'
  | 'children.children.internal.ignoreType'
  | 'children.children.internal.mediaType'
  | 'children.children.internal.owner'
  | 'children.children.internal.type'
  | 'children.children.parent.children'
  | 'children.children.parent.id'
  | 'children.id'
  | 'children.internal.content'
  | 'children.internal.contentDigest'
  | 'children.internal.contentFilePath'
  | 'children.internal.description'
  | 'children.internal.fieldOwners'
  | 'children.internal.ignoreType'
  | 'children.internal.mediaType'
  | 'children.internal.owner'
  | 'children.internal.type'
  | 'children.parent.children'
  | 'children.parent.children.children'
  | 'children.parent.children.id'
  | 'children.parent.id'
  | 'children.parent.internal.content'
  | 'children.parent.internal.contentDigest'
  | 'children.parent.internal.contentFilePath'
  | 'children.parent.internal.description'
  | 'children.parent.internal.fieldOwners'
  | 'children.parent.internal.ignoreType'
  | 'children.parent.internal.mediaType'
  | 'children.parent.internal.owner'
  | 'children.parent.internal.type'
  | 'children.parent.parent.children'
  | 'children.parent.parent.id'
  | 'ctime'
  | 'ctimeMs'
  | 'dev'
  | 'dir'
  | 'ext'
  | 'extension'
  | 'gid'
  | 'id'
  | 'ino'
  | 'internal.content'
  | 'internal.contentDigest'
  | 'internal.contentFilePath'
  | 'internal.description'
  | 'internal.fieldOwners'
  | 'internal.ignoreType'
  | 'internal.mediaType'
  | 'internal.owner'
  | 'internal.type'
  | 'mode'
  | 'modifiedTime'
  | 'mtime'
  | 'mtimeMs'
  | 'name'
  | 'nlink'
  | 'parent.children'
  | 'parent.children.children'
  | 'parent.children.children.children'
  | 'parent.children.children.id'
  | 'parent.children.id'
  | 'parent.children.internal.content'
  | 'parent.children.internal.contentDigest'
  | 'parent.children.internal.contentFilePath'
  | 'parent.children.internal.description'
  | 'parent.children.internal.fieldOwners'
  | 'parent.children.internal.ignoreType'
  | 'parent.children.internal.mediaType'
  | 'parent.children.internal.owner'
  | 'parent.children.internal.type'
  | 'parent.children.parent.children'
  | 'parent.children.parent.id'
  | 'parent.id'
  | 'parent.internal.content'
  | 'parent.internal.contentDigest'
  | 'parent.internal.contentFilePath'
  | 'parent.internal.description'
  | 'parent.internal.fieldOwners'
  | 'parent.internal.ignoreType'
  | 'parent.internal.mediaType'
  | 'parent.internal.owner'
  | 'parent.internal.type'
  | 'parent.parent.children'
  | 'parent.parent.children.children'
  | 'parent.parent.children.id'
  | 'parent.parent.id'
  | 'parent.parent.internal.content'
  | 'parent.parent.internal.contentDigest'
  | 'parent.parent.internal.contentFilePath'
  | 'parent.parent.internal.description'
  | 'parent.parent.internal.fieldOwners'
  | 'parent.parent.internal.ignoreType'
  | 'parent.parent.internal.mediaType'
  | 'parent.parent.internal.owner'
  | 'parent.parent.internal.type'
  | 'parent.parent.parent.children'
  | 'parent.parent.parent.id'
  | 'prettySize'
  | 'publicURL'
  | 'rdev'
  | 'relativeDirectory'
  | 'relativePath'
  | 'root'
  | 'size'
  | 'sourceInstanceName'
  | 'uid';

type FileFilterInput = {
  readonly absolutePath: InputMaybe<StringQueryOperatorInput>;
  readonly accessTime: InputMaybe<DateQueryOperatorInput>;
  readonly atime: InputMaybe<DateQueryOperatorInput>;
  readonly atimeMs: InputMaybe<FloatQueryOperatorInput>;
  readonly base: InputMaybe<StringQueryOperatorInput>;
  readonly birthTime: InputMaybe<DateQueryOperatorInput>;
  readonly birthtime: InputMaybe<DateQueryOperatorInput>;
  readonly birthtimeMs: InputMaybe<FloatQueryOperatorInput>;
  readonly blksize: InputMaybe<IntQueryOperatorInput>;
  readonly blocks: InputMaybe<IntQueryOperatorInput>;
  readonly changeTime: InputMaybe<DateQueryOperatorInput>;
  readonly childMdx: InputMaybe<MdxFilterInput>;
  readonly children: InputMaybe<NodeFilterListInput>;
  readonly childrenMdx: InputMaybe<MdxFilterListInput>;
  readonly ctime: InputMaybe<DateQueryOperatorInput>;
  readonly ctimeMs: InputMaybe<FloatQueryOperatorInput>;
  readonly dev: InputMaybe<IntQueryOperatorInput>;
  readonly dir: InputMaybe<StringQueryOperatorInput>;
  readonly ext: InputMaybe<StringQueryOperatorInput>;
  readonly extension: InputMaybe<StringQueryOperatorInput>;
  readonly gid: InputMaybe<IntQueryOperatorInput>;
  readonly id: InputMaybe<StringQueryOperatorInput>;
  readonly ino: InputMaybe<FloatQueryOperatorInput>;
  readonly internal: InputMaybe<InternalFilterInput>;
  readonly mode: InputMaybe<IntQueryOperatorInput>;
  readonly modifiedTime: InputMaybe<DateQueryOperatorInput>;
  readonly mtime: InputMaybe<DateQueryOperatorInput>;
  readonly mtimeMs: InputMaybe<FloatQueryOperatorInput>;
  readonly name: InputMaybe<StringQueryOperatorInput>;
  readonly nlink: InputMaybe<IntQueryOperatorInput>;
  readonly parent: InputMaybe<NodeFilterInput>;
  readonly prettySize: InputMaybe<StringQueryOperatorInput>;
  readonly publicURL: InputMaybe<StringQueryOperatorInput>;
  readonly rdev: InputMaybe<IntQueryOperatorInput>;
  readonly relativeDirectory: InputMaybe<StringQueryOperatorInput>;
  readonly relativePath: InputMaybe<StringQueryOperatorInput>;
  readonly root: InputMaybe<StringQueryOperatorInput>;
  readonly size: InputMaybe<IntQueryOperatorInput>;
  readonly sourceInstanceName: InputMaybe<StringQueryOperatorInput>;
  readonly uid: InputMaybe<IntQueryOperatorInput>;
};

type FileGroupConnection = {
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly edges: ReadonlyArray<FileEdge>;
  readonly field: Scalars['String'];
  readonly fieldValue: Maybe<Scalars['String']>;
  readonly group: ReadonlyArray<FileGroupConnection>;
  readonly max: Maybe<Scalars['Float']>;
  readonly min: Maybe<Scalars['Float']>;
  readonly nodes: ReadonlyArray<File>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars['Float']>;
  readonly totalCount: Scalars['Int'];
};


type FileGroupConnection_distinctArgs = {
  field: FileFieldsEnum;
};


type FileGroupConnection_groupArgs = {
  field: FileFieldsEnum;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
};


type FileGroupConnection_maxArgs = {
  field: FileFieldsEnum;
};


type FileGroupConnection_minArgs = {
  field: FileFieldsEnum;
};


type FileGroupConnection_sumArgs = {
  field: FileFieldsEnum;
};

type FileSortInput = {
  readonly fields: InputMaybe<ReadonlyArray<InputMaybe<FileFieldsEnum>>>;
  readonly order: InputMaybe<ReadonlyArray<InputMaybe<SortOrderEnum>>>;
};

type FloatQueryOperatorInput = {
  readonly eq: InputMaybe<Scalars['Float']>;
  readonly gt: InputMaybe<Scalars['Float']>;
  readonly gte: InputMaybe<Scalars['Float']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Float']>>>;
  readonly lt: InputMaybe<Scalars['Float']>;
  readonly lte: InputMaybe<Scalars['Float']>;
  readonly ne: InputMaybe<Scalars['Float']>;
  readonly nin: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Float']>>>;
};

type HeadingsMdx =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';

type IntQueryOperatorInput = {
  readonly eq: InputMaybe<Scalars['Int']>;
  readonly gt: InputMaybe<Scalars['Int']>;
  readonly gte: InputMaybe<Scalars['Int']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  readonly lt: InputMaybe<Scalars['Int']>;
  readonly lte: InputMaybe<Scalars['Int']>;
  readonly ne: InputMaybe<Scalars['Int']>;
  readonly nin: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
};

type Internal = {
  readonly content: Maybe<Scalars['String']>;
  readonly contentDigest: Scalars['String'];
  readonly contentFilePath: Maybe<Scalars['String']>;
  readonly description: Maybe<Scalars['String']>;
  readonly fieldOwners: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly ignoreType: Maybe<Scalars['Boolean']>;
  readonly mediaType: Maybe<Scalars['String']>;
  readonly owner: Scalars['String'];
  readonly type: Scalars['String'];
};

type InternalFilterInput = {
  readonly content: InputMaybe<StringQueryOperatorInput>;
  readonly contentDigest: InputMaybe<StringQueryOperatorInput>;
  readonly contentFilePath: InputMaybe<StringQueryOperatorInput>;
  readonly description: InputMaybe<StringQueryOperatorInput>;
  readonly fieldOwners: InputMaybe<StringQueryOperatorInput>;
  readonly ignoreType: InputMaybe<BooleanQueryOperatorInput>;
  readonly mediaType: InputMaybe<StringQueryOperatorInput>;
  readonly owner: InputMaybe<StringQueryOperatorInput>;
  readonly type: InputMaybe<StringQueryOperatorInput>;
};

type JSONQueryOperatorInput = {
  readonly eq: InputMaybe<Scalars['JSON']>;
  readonly glob: InputMaybe<Scalars['JSON']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['JSON']>>>;
  readonly ne: InputMaybe<Scalars['JSON']>;
  readonly nin: InputMaybe<ReadonlyArray<InputMaybe<Scalars['JSON']>>>;
  readonly regex: InputMaybe<Scalars['JSON']>;
};

type Mdx = Node & {
  readonly body: Scalars['String'];
  readonly children: ReadonlyArray<Node>;
  readonly excerpt: Scalars['String'];
  readonly fields: Maybe<MdxFields>;
  readonly fileAbsolutePath: Scalars['String'];
  readonly frontmatter: Maybe<MdxFrontmatter>;
  readonly headings: Maybe<ReadonlyArray<Maybe<MdxHeadingMdx>>>;
  readonly html: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  readonly internal: Internal;
  readonly mdxAST: Maybe<Scalars['JSON']>;
  readonly parent: Maybe<Node>;
  readonly rawBody: Scalars['String'];
  readonly slug: Maybe<Scalars['String']>;
  readonly tableOfContents: Maybe<Scalars['JSON']>;
  readonly timeToRead: Maybe<Scalars['Int']>;
  readonly wordCount: Maybe<MdxWordCount>;
};


type Mdx_excerptArgs = {
  pruneLength?: InputMaybe<Scalars['Int']>;
  truncate?: InputMaybe<Scalars['Boolean']>;
};


type Mdx_headingsArgs = {
  depth: InputMaybe<HeadingsMdx>;
};


type Mdx_tableOfContentsArgs = {
  maxDepth: InputMaybe<Scalars['Int']>;
};

type MdxConnection = {
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly edges: ReadonlyArray<MdxEdge>;
  readonly group: ReadonlyArray<MdxGroupConnection>;
  readonly max: Maybe<Scalars['Float']>;
  readonly min: Maybe<Scalars['Float']>;
  readonly nodes: ReadonlyArray<Mdx>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars['Float']>;
  readonly totalCount: Scalars['Int'];
};


type MdxConnection_distinctArgs = {
  field: MdxFieldsEnum;
};


type MdxConnection_groupArgs = {
  field: MdxFieldsEnum;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
};


type MdxConnection_maxArgs = {
  field: MdxFieldsEnum;
};


type MdxConnection_minArgs = {
  field: MdxFieldsEnum;
};


type MdxConnection_sumArgs = {
  field: MdxFieldsEnum;
};

type MdxEdge = {
  readonly next: Maybe<Mdx>;
  readonly node: Mdx;
  readonly previous: Maybe<Mdx>;
};

type MdxFields = {
  readonly category: Maybe<Scalars['String']>;
  readonly hierarchy: Maybe<Scalars['String']>;
  readonly slug: Maybe<Scalars['String']>;
  readonly storyData: Maybe<MdxFieldsStoryData>;
};

type MdxFieldsEnum =
  | 'body'
  | 'children'
  | 'children.children'
  | 'children.children.children'
  | 'children.children.children.children'
  | 'children.children.children.id'
  | 'children.children.id'
  | 'children.children.internal.content'
  | 'children.children.internal.contentDigest'
  | 'children.children.internal.contentFilePath'
  | 'children.children.internal.description'
  | 'children.children.internal.fieldOwners'
  | 'children.children.internal.ignoreType'
  | 'children.children.internal.mediaType'
  | 'children.children.internal.owner'
  | 'children.children.internal.type'
  | 'children.children.parent.children'
  | 'children.children.parent.id'
  | 'children.id'
  | 'children.internal.content'
  | 'children.internal.contentDigest'
  | 'children.internal.contentFilePath'
  | 'children.internal.description'
  | 'children.internal.fieldOwners'
  | 'children.internal.ignoreType'
  | 'children.internal.mediaType'
  | 'children.internal.owner'
  | 'children.internal.type'
  | 'children.parent.children'
  | 'children.parent.children.children'
  | 'children.parent.children.id'
  | 'children.parent.id'
  | 'children.parent.internal.content'
  | 'children.parent.internal.contentDigest'
  | 'children.parent.internal.contentFilePath'
  | 'children.parent.internal.description'
  | 'children.parent.internal.fieldOwners'
  | 'children.parent.internal.ignoreType'
  | 'children.parent.internal.mediaType'
  | 'children.parent.internal.owner'
  | 'children.parent.internal.type'
  | 'children.parent.parent.children'
  | 'children.parent.parent.id'
  | 'excerpt'
  | 'fields.category'
  | 'fields.hierarchy'
  | 'fields.slug'
  | 'fields.storyData.code'
  | 'fields.storyData.groupPath'
  | 'fields.storyData.storyItems'
  | 'fields.storyData.storyItems.iframeName'
  | 'fields.storyData.storyItems.label'
  | 'fields.storyData.storyItems.name'
  | 'fileAbsolutePath'
  | 'frontmatter.author'
  | 'frontmatter.date'
  | 'frontmatter.description'
  | 'frontmatter.order'
  | 'frontmatter.smarthr_ui'
  | 'frontmatter.storyName'
  | 'frontmatter.title'
  | 'headings'
  | 'headings.depth'
  | 'headings.value'
  | 'html'
  | 'id'
  | 'internal.content'
  | 'internal.contentDigest'
  | 'internal.contentFilePath'
  | 'internal.description'
  | 'internal.fieldOwners'
  | 'internal.ignoreType'
  | 'internal.mediaType'
  | 'internal.owner'
  | 'internal.type'
  | 'mdxAST'
  | 'parent.children'
  | 'parent.children.children'
  | 'parent.children.children.children'
  | 'parent.children.children.id'
  | 'parent.children.id'
  | 'parent.children.internal.content'
  | 'parent.children.internal.contentDigest'
  | 'parent.children.internal.contentFilePath'
  | 'parent.children.internal.description'
  | 'parent.children.internal.fieldOwners'
  | 'parent.children.internal.ignoreType'
  | 'parent.children.internal.mediaType'
  | 'parent.children.internal.owner'
  | 'parent.children.internal.type'
  | 'parent.children.parent.children'
  | 'parent.children.parent.id'
  | 'parent.id'
  | 'parent.internal.content'
  | 'parent.internal.contentDigest'
  | 'parent.internal.contentFilePath'
  | 'parent.internal.description'
  | 'parent.internal.fieldOwners'
  | 'parent.internal.ignoreType'
  | 'parent.internal.mediaType'
  | 'parent.internal.owner'
  | 'parent.internal.type'
  | 'parent.parent.children'
  | 'parent.parent.children.children'
  | 'parent.parent.children.id'
  | 'parent.parent.id'
  | 'parent.parent.internal.content'
  | 'parent.parent.internal.contentDigest'
  | 'parent.parent.internal.contentFilePath'
  | 'parent.parent.internal.description'
  | 'parent.parent.internal.fieldOwners'
  | 'parent.parent.internal.ignoreType'
  | 'parent.parent.internal.mediaType'
  | 'parent.parent.internal.owner'
  | 'parent.parent.internal.type'
  | 'parent.parent.parent.children'
  | 'parent.parent.parent.id'
  | 'rawBody'
  | 'slug'
  | 'tableOfContents'
  | 'timeToRead'
  | 'wordCount.paragraphs'
  | 'wordCount.sentences'
  | 'wordCount.words';

type MdxFieldsFilterInput = {
  readonly category: InputMaybe<StringQueryOperatorInput>;
  readonly hierarchy: InputMaybe<StringQueryOperatorInput>;
  readonly slug: InputMaybe<StringQueryOperatorInput>;
  readonly storyData: InputMaybe<MdxFieldsStoryDataFilterInput>;
};

type MdxFieldsStoryData = {
  readonly code: Maybe<Scalars['String']>;
  readonly groupPath: Maybe<Scalars['String']>;
  readonly storyItems: Maybe<ReadonlyArray<Maybe<MdxFieldsStoryDataStoryItems>>>;
};

type MdxFieldsStoryDataFilterInput = {
  readonly code: InputMaybe<StringQueryOperatorInput>;
  readonly groupPath: InputMaybe<StringQueryOperatorInput>;
  readonly storyItems: InputMaybe<MdxFieldsStoryDataStoryItemsFilterListInput>;
};

type MdxFieldsStoryDataStoryItems = {
  readonly iframeName: Maybe<Scalars['String']>;
  readonly label: Maybe<Scalars['String']>;
  readonly name: Maybe<Scalars['String']>;
};

type MdxFieldsStoryDataStoryItemsFilterInput = {
  readonly iframeName: InputMaybe<StringQueryOperatorInput>;
  readonly label: InputMaybe<StringQueryOperatorInput>;
  readonly name: InputMaybe<StringQueryOperatorInput>;
};

type MdxFieldsStoryDataStoryItemsFilterListInput = {
  readonly elemMatch: InputMaybe<MdxFieldsStoryDataStoryItemsFilterInput>;
};

type MdxFilterInput = {
  readonly body: InputMaybe<StringQueryOperatorInput>;
  readonly children: InputMaybe<NodeFilterListInput>;
  readonly excerpt: InputMaybe<StringQueryOperatorInput>;
  readonly fields: InputMaybe<MdxFieldsFilterInput>;
  readonly fileAbsolutePath: InputMaybe<StringQueryOperatorInput>;
  readonly frontmatter: InputMaybe<MdxFrontmatterFilterInput>;
  readonly headings: InputMaybe<MdxHeadingMdxFilterListInput>;
  readonly html: InputMaybe<StringQueryOperatorInput>;
  readonly id: InputMaybe<StringQueryOperatorInput>;
  readonly internal: InputMaybe<InternalFilterInput>;
  readonly mdxAST: InputMaybe<JSONQueryOperatorInput>;
  readonly parent: InputMaybe<NodeFilterInput>;
  readonly rawBody: InputMaybe<StringQueryOperatorInput>;
  readonly slug: InputMaybe<StringQueryOperatorInput>;
  readonly tableOfContents: InputMaybe<JSONQueryOperatorInput>;
  readonly timeToRead: InputMaybe<IntQueryOperatorInput>;
  readonly wordCount: InputMaybe<MdxWordCountFilterInput>;
};

type MdxFilterListInput = {
  readonly elemMatch: InputMaybe<MdxFilterInput>;
};

type MdxFrontmatter = {
  readonly author: Maybe<Scalars['String']>;
  readonly date: Maybe<Scalars['String']>;
  readonly description: Scalars['String'];
  readonly order: Maybe<Scalars['Int']>;
  readonly smarthr_ui: Maybe<Scalars['String']>;
  readonly storyName: Maybe<Scalars['String']>;
  readonly title: Scalars['String'];
};

type MdxFrontmatterFilterInput = {
  readonly author: InputMaybe<StringQueryOperatorInput>;
  readonly date: InputMaybe<StringQueryOperatorInput>;
  readonly description: InputMaybe<StringQueryOperatorInput>;
  readonly order: InputMaybe<IntQueryOperatorInput>;
  readonly smarthr_ui: InputMaybe<StringQueryOperatorInput>;
  readonly storyName: InputMaybe<StringQueryOperatorInput>;
  readonly title: InputMaybe<StringQueryOperatorInput>;
};

type MdxGroupConnection = {
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly edges: ReadonlyArray<MdxEdge>;
  readonly field: Scalars['String'];
  readonly fieldValue: Maybe<Scalars['String']>;
  readonly group: ReadonlyArray<MdxGroupConnection>;
  readonly max: Maybe<Scalars['Float']>;
  readonly min: Maybe<Scalars['Float']>;
  readonly nodes: ReadonlyArray<Mdx>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars['Float']>;
  readonly totalCount: Scalars['Int'];
};


type MdxGroupConnection_distinctArgs = {
  field: MdxFieldsEnum;
};


type MdxGroupConnection_groupArgs = {
  field: MdxFieldsEnum;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
};


type MdxGroupConnection_maxArgs = {
  field: MdxFieldsEnum;
};


type MdxGroupConnection_minArgs = {
  field: MdxFieldsEnum;
};


type MdxGroupConnection_sumArgs = {
  field: MdxFieldsEnum;
};

type MdxHeadingMdx = {
  readonly depth: Maybe<Scalars['Int']>;
  readonly value: Maybe<Scalars['String']>;
};

type MdxHeadingMdxFilterInput = {
  readonly depth: InputMaybe<IntQueryOperatorInput>;
  readonly value: InputMaybe<StringQueryOperatorInput>;
};

type MdxHeadingMdxFilterListInput = {
  readonly elemMatch: InputMaybe<MdxHeadingMdxFilterInput>;
};

type MdxSortInput = {
  readonly fields: InputMaybe<ReadonlyArray<InputMaybe<MdxFieldsEnum>>>;
  readonly order: InputMaybe<ReadonlyArray<InputMaybe<SortOrderEnum>>>;
};

type MdxWordCount = {
  readonly paragraphs: Maybe<Scalars['Int']>;
  readonly sentences: Maybe<Scalars['Int']>;
  readonly words: Maybe<Scalars['Int']>;
};

type MdxWordCountFilterInput = {
  readonly paragraphs: InputMaybe<IntQueryOperatorInput>;
  readonly sentences: InputMaybe<IntQueryOperatorInput>;
  readonly words: InputMaybe<IntQueryOperatorInput>;
};

/** Node Interface */
type Node = {
  readonly children: ReadonlyArray<Node>;
  readonly id: Scalars['ID'];
  readonly internal: Internal;
  readonly parent: Maybe<Node>;
};

type NodeFilterInput = {
  readonly children: InputMaybe<NodeFilterListInput>;
  readonly id: InputMaybe<StringQueryOperatorInput>;
  readonly internal: InputMaybe<InternalFilterInput>;
  readonly parent: InputMaybe<NodeFilterInput>;
};

type NodeFilterListInput = {
  readonly elemMatch: InputMaybe<NodeFilterInput>;
};

type PageInfo = {
  readonly currentPage: Scalars['Int'];
  readonly hasNextPage: Scalars['Boolean'];
  readonly hasPreviousPage: Scalars['Boolean'];
  readonly itemCount: Scalars['Int'];
  readonly pageCount: Scalars['Int'];
  readonly perPage: Maybe<Scalars['Int']>;
  readonly totalCount: Scalars['Int'];
};

type Query = {
  readonly airtable: Maybe<Airtable>;
  readonly allAirtable: AirtableConnection;
  readonly allDirectory: DirectoryConnection;
  readonly allFile: FileConnection;
  readonly allMdx: MdxConnection;
  readonly allSite: SiteConnection;
  readonly allSiteBuildMetadata: SiteBuildMetadataConnection;
  readonly allSiteFunction: SiteFunctionConnection;
  readonly allSitePage: SitePageConnection;
  readonly allSitePlugin: SitePluginConnection;
  readonly directory: Maybe<Directory>;
  readonly file: Maybe<File>;
  readonly mdx: Maybe<Mdx>;
  readonly site: Maybe<Site>;
  readonly siteBuildMetadata: Maybe<SiteBuildMetadata>;
  readonly siteFunction: Maybe<SiteFunction>;
  readonly sitePage: Maybe<SitePage>;
  readonly sitePlugin: Maybe<SitePlugin>;
};


type Query_airtableArgs = {
  children: InputMaybe<NodeFilterListInput>;
  data: InputMaybe<AirtableDataFilterInput>;
  id: InputMaybe<StringQueryOperatorInput>;
  internal: InputMaybe<InternalFilterInput>;
  parent: InputMaybe<NodeFilterInput>;
  recordId: InputMaybe<StringQueryOperatorInput>;
  rowIndex: InputMaybe<IntQueryOperatorInput>;
  table: InputMaybe<StringQueryOperatorInput>;
};


type Query_allAirtableArgs = {
  filter: InputMaybe<AirtableFilterInput>;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<AirtableSortInput>;
};


type Query_allDirectoryArgs = {
  filter: InputMaybe<DirectoryFilterInput>;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<DirectorySortInput>;
};


type Query_allFileArgs = {
  filter: InputMaybe<FileFilterInput>;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<FileSortInput>;
};


type Query_allMdxArgs = {
  filter: InputMaybe<MdxFilterInput>;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<MdxSortInput>;
};


type Query_allSiteArgs = {
  filter: InputMaybe<SiteFilterInput>;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<SiteSortInput>;
};


type Query_allSiteBuildMetadataArgs = {
  filter: InputMaybe<SiteBuildMetadataFilterInput>;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<SiteBuildMetadataSortInput>;
};


type Query_allSiteFunctionArgs = {
  filter: InputMaybe<SiteFunctionFilterInput>;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<SiteFunctionSortInput>;
};


type Query_allSitePageArgs = {
  filter: InputMaybe<SitePageFilterInput>;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<SitePageSortInput>;
};


type Query_allSitePluginArgs = {
  filter: InputMaybe<SitePluginFilterInput>;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<SitePluginSortInput>;
};


type Query_directoryArgs = {
  absolutePath: InputMaybe<StringQueryOperatorInput>;
  accessTime: InputMaybe<DateQueryOperatorInput>;
  atime: InputMaybe<DateQueryOperatorInput>;
  atimeMs: InputMaybe<FloatQueryOperatorInput>;
  base: InputMaybe<StringQueryOperatorInput>;
  birthTime: InputMaybe<DateQueryOperatorInput>;
  birthtime: InputMaybe<DateQueryOperatorInput>;
  birthtimeMs: InputMaybe<FloatQueryOperatorInput>;
  changeTime: InputMaybe<DateQueryOperatorInput>;
  children: InputMaybe<NodeFilterListInput>;
  ctime: InputMaybe<DateQueryOperatorInput>;
  ctimeMs: InputMaybe<FloatQueryOperatorInput>;
  dev: InputMaybe<IntQueryOperatorInput>;
  dir: InputMaybe<StringQueryOperatorInput>;
  ext: InputMaybe<StringQueryOperatorInput>;
  extension: InputMaybe<StringQueryOperatorInput>;
  gid: InputMaybe<IntQueryOperatorInput>;
  id: InputMaybe<StringQueryOperatorInput>;
  ino: InputMaybe<FloatQueryOperatorInput>;
  internal: InputMaybe<InternalFilterInput>;
  mode: InputMaybe<IntQueryOperatorInput>;
  modifiedTime: InputMaybe<DateQueryOperatorInput>;
  mtime: InputMaybe<DateQueryOperatorInput>;
  mtimeMs: InputMaybe<FloatQueryOperatorInput>;
  name: InputMaybe<StringQueryOperatorInput>;
  nlink: InputMaybe<IntQueryOperatorInput>;
  parent: InputMaybe<NodeFilterInput>;
  prettySize: InputMaybe<StringQueryOperatorInput>;
  rdev: InputMaybe<IntQueryOperatorInput>;
  relativeDirectory: InputMaybe<StringQueryOperatorInput>;
  relativePath: InputMaybe<StringQueryOperatorInput>;
  root: InputMaybe<StringQueryOperatorInput>;
  size: InputMaybe<IntQueryOperatorInput>;
  sourceInstanceName: InputMaybe<StringQueryOperatorInput>;
  uid: InputMaybe<IntQueryOperatorInput>;
};


type Query_fileArgs = {
  absolutePath: InputMaybe<StringQueryOperatorInput>;
  accessTime: InputMaybe<DateQueryOperatorInput>;
  atime: InputMaybe<DateQueryOperatorInput>;
  atimeMs: InputMaybe<FloatQueryOperatorInput>;
  base: InputMaybe<StringQueryOperatorInput>;
  birthTime: InputMaybe<DateQueryOperatorInput>;
  birthtime: InputMaybe<DateQueryOperatorInput>;
  birthtimeMs: InputMaybe<FloatQueryOperatorInput>;
  blksize: InputMaybe<IntQueryOperatorInput>;
  blocks: InputMaybe<IntQueryOperatorInput>;
  changeTime: InputMaybe<DateQueryOperatorInput>;
  childMdx: InputMaybe<MdxFilterInput>;
  children: InputMaybe<NodeFilterListInput>;
  childrenMdx: InputMaybe<MdxFilterListInput>;
  ctime: InputMaybe<DateQueryOperatorInput>;
  ctimeMs: InputMaybe<FloatQueryOperatorInput>;
  dev: InputMaybe<IntQueryOperatorInput>;
  dir: InputMaybe<StringQueryOperatorInput>;
  ext: InputMaybe<StringQueryOperatorInput>;
  extension: InputMaybe<StringQueryOperatorInput>;
  gid: InputMaybe<IntQueryOperatorInput>;
  id: InputMaybe<StringQueryOperatorInput>;
  ino: InputMaybe<FloatQueryOperatorInput>;
  internal: InputMaybe<InternalFilterInput>;
  mode: InputMaybe<IntQueryOperatorInput>;
  modifiedTime: InputMaybe<DateQueryOperatorInput>;
  mtime: InputMaybe<DateQueryOperatorInput>;
  mtimeMs: InputMaybe<FloatQueryOperatorInput>;
  name: InputMaybe<StringQueryOperatorInput>;
  nlink: InputMaybe<IntQueryOperatorInput>;
  parent: InputMaybe<NodeFilterInput>;
  prettySize: InputMaybe<StringQueryOperatorInput>;
  publicURL: InputMaybe<StringQueryOperatorInput>;
  rdev: InputMaybe<IntQueryOperatorInput>;
  relativeDirectory: InputMaybe<StringQueryOperatorInput>;
  relativePath: InputMaybe<StringQueryOperatorInput>;
  root: InputMaybe<StringQueryOperatorInput>;
  size: InputMaybe<IntQueryOperatorInput>;
  sourceInstanceName: InputMaybe<StringQueryOperatorInput>;
  uid: InputMaybe<IntQueryOperatorInput>;
};


type Query_mdxArgs = {
  body: InputMaybe<StringQueryOperatorInput>;
  children: InputMaybe<NodeFilterListInput>;
  excerpt: InputMaybe<StringQueryOperatorInput>;
  fields: InputMaybe<MdxFieldsFilterInput>;
  fileAbsolutePath: InputMaybe<StringQueryOperatorInput>;
  frontmatter: InputMaybe<MdxFrontmatterFilterInput>;
  headings: InputMaybe<MdxHeadingMdxFilterListInput>;
  html: InputMaybe<StringQueryOperatorInput>;
  id: InputMaybe<StringQueryOperatorInput>;
  internal: InputMaybe<InternalFilterInput>;
  mdxAST: InputMaybe<JSONQueryOperatorInput>;
  parent: InputMaybe<NodeFilterInput>;
  rawBody: InputMaybe<StringQueryOperatorInput>;
  slug: InputMaybe<StringQueryOperatorInput>;
  tableOfContents: InputMaybe<JSONQueryOperatorInput>;
  timeToRead: InputMaybe<IntQueryOperatorInput>;
  wordCount: InputMaybe<MdxWordCountFilterInput>;
};


type Query_siteArgs = {
  buildTime: InputMaybe<DateQueryOperatorInput>;
  children: InputMaybe<NodeFilterListInput>;
  graphqlTypegen: InputMaybe<BooleanQueryOperatorInput>;
  id: InputMaybe<StringQueryOperatorInput>;
  internal: InputMaybe<InternalFilterInput>;
  jsxRuntime: InputMaybe<StringQueryOperatorInput>;
  parent: InputMaybe<NodeFilterInput>;
  pathPrefix: InputMaybe<StringQueryOperatorInput>;
  polyfill: InputMaybe<BooleanQueryOperatorInput>;
  siteMetadata: InputMaybe<SiteSiteMetadataFilterInput>;
  trailingSlash: InputMaybe<StringQueryOperatorInput>;
};


type Query_siteBuildMetadataArgs = {
  buildTime: InputMaybe<DateQueryOperatorInput>;
  children: InputMaybe<NodeFilterListInput>;
  id: InputMaybe<StringQueryOperatorInput>;
  internal: InputMaybe<InternalFilterInput>;
  parent: InputMaybe<NodeFilterInput>;
};


type Query_siteFunctionArgs = {
  absoluteCompiledFilePath: InputMaybe<StringQueryOperatorInput>;
  children: InputMaybe<NodeFilterListInput>;
  functionRoute: InputMaybe<StringQueryOperatorInput>;
  id: InputMaybe<StringQueryOperatorInput>;
  internal: InputMaybe<InternalFilterInput>;
  matchPath: InputMaybe<StringQueryOperatorInput>;
  originalAbsoluteFilePath: InputMaybe<StringQueryOperatorInput>;
  originalRelativeFilePath: InputMaybe<StringQueryOperatorInput>;
  parent: InputMaybe<NodeFilterInput>;
  pluginName: InputMaybe<StringQueryOperatorInput>;
  relativeCompiledFilePath: InputMaybe<StringQueryOperatorInput>;
};


type Query_sitePageArgs = {
  children: InputMaybe<NodeFilterListInput>;
  component: InputMaybe<StringQueryOperatorInput>;
  componentChunkName: InputMaybe<StringQueryOperatorInput>;
  id: InputMaybe<StringQueryOperatorInput>;
  internal: InputMaybe<InternalFilterInput>;
  internalComponentName: InputMaybe<StringQueryOperatorInput>;
  matchPath: InputMaybe<StringQueryOperatorInput>;
  pageContext: InputMaybe<JSONQueryOperatorInput>;
  parent: InputMaybe<NodeFilterInput>;
  path: InputMaybe<StringQueryOperatorInput>;
  pluginCreator: InputMaybe<SitePluginFilterInput>;
};


type Query_sitePluginArgs = {
  browserAPIs: InputMaybe<StringQueryOperatorInput>;
  children: InputMaybe<NodeFilterListInput>;
  id: InputMaybe<StringQueryOperatorInput>;
  internal: InputMaybe<InternalFilterInput>;
  name: InputMaybe<StringQueryOperatorInput>;
  nodeAPIs: InputMaybe<StringQueryOperatorInput>;
  packageJson: InputMaybe<JSONQueryOperatorInput>;
  parent: InputMaybe<NodeFilterInput>;
  pluginFilepath: InputMaybe<StringQueryOperatorInput>;
  pluginOptions: InputMaybe<JSONQueryOperatorInput>;
  resolve: InputMaybe<StringQueryOperatorInput>;
  ssrAPIs: InputMaybe<StringQueryOperatorInput>;
  version: InputMaybe<StringQueryOperatorInput>;
};

type Site = Node & {
  readonly buildTime: Maybe<Scalars['Date']>;
  readonly children: ReadonlyArray<Node>;
  readonly graphqlTypegen: Maybe<Scalars['Boolean']>;
  readonly id: Scalars['ID'];
  readonly internal: Internal;
  readonly jsxRuntime: Maybe<Scalars['String']>;
  readonly parent: Maybe<Node>;
  readonly pathPrefix: Maybe<Scalars['String']>;
  readonly polyfill: Maybe<Scalars['Boolean']>;
  readonly siteMetadata: Maybe<SiteSiteMetadata>;
  readonly trailingSlash: Maybe<Scalars['String']>;
};


type Site_buildTimeArgs = {
  difference: InputMaybe<Scalars['String']>;
  formatString: InputMaybe<Scalars['String']>;
  fromNow: InputMaybe<Scalars['Boolean']>;
  locale: InputMaybe<Scalars['String']>;
};

type SiteBuildMetadata = Node & {
  readonly buildTime: Maybe<Scalars['Date']>;
  readonly children: ReadonlyArray<Node>;
  readonly id: Scalars['ID'];
  readonly internal: Internal;
  readonly parent: Maybe<Node>;
};


type SiteBuildMetadata_buildTimeArgs = {
  difference: InputMaybe<Scalars['String']>;
  formatString: InputMaybe<Scalars['String']>;
  fromNow: InputMaybe<Scalars['Boolean']>;
  locale: InputMaybe<Scalars['String']>;
};

type SiteBuildMetadataConnection = {
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly edges: ReadonlyArray<SiteBuildMetadataEdge>;
  readonly group: ReadonlyArray<SiteBuildMetadataGroupConnection>;
  readonly max: Maybe<Scalars['Float']>;
  readonly min: Maybe<Scalars['Float']>;
  readonly nodes: ReadonlyArray<SiteBuildMetadata>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars['Float']>;
  readonly totalCount: Scalars['Int'];
};


type SiteBuildMetadataConnection_distinctArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


type SiteBuildMetadataConnection_groupArgs = {
  field: SiteBuildMetadataFieldsEnum;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
};


type SiteBuildMetadataConnection_maxArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


type SiteBuildMetadataConnection_minArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


type SiteBuildMetadataConnection_sumArgs = {
  field: SiteBuildMetadataFieldsEnum;
};

type SiteBuildMetadataEdge = {
  readonly next: Maybe<SiteBuildMetadata>;
  readonly node: SiteBuildMetadata;
  readonly previous: Maybe<SiteBuildMetadata>;
};

type SiteBuildMetadataFieldsEnum =
  | 'buildTime'
  | 'children'
  | 'children.children'
  | 'children.children.children'
  | 'children.children.children.children'
  | 'children.children.children.id'
  | 'children.children.id'
  | 'children.children.internal.content'
  | 'children.children.internal.contentDigest'
  | 'children.children.internal.contentFilePath'
  | 'children.children.internal.description'
  | 'children.children.internal.fieldOwners'
  | 'children.children.internal.ignoreType'
  | 'children.children.internal.mediaType'
  | 'children.children.internal.owner'
  | 'children.children.internal.type'
  | 'children.children.parent.children'
  | 'children.children.parent.id'
  | 'children.id'
  | 'children.internal.content'
  | 'children.internal.contentDigest'
  | 'children.internal.contentFilePath'
  | 'children.internal.description'
  | 'children.internal.fieldOwners'
  | 'children.internal.ignoreType'
  | 'children.internal.mediaType'
  | 'children.internal.owner'
  | 'children.internal.type'
  | 'children.parent.children'
  | 'children.parent.children.children'
  | 'children.parent.children.id'
  | 'children.parent.id'
  | 'children.parent.internal.content'
  | 'children.parent.internal.contentDigest'
  | 'children.parent.internal.contentFilePath'
  | 'children.parent.internal.description'
  | 'children.parent.internal.fieldOwners'
  | 'children.parent.internal.ignoreType'
  | 'children.parent.internal.mediaType'
  | 'children.parent.internal.owner'
  | 'children.parent.internal.type'
  | 'children.parent.parent.children'
  | 'children.parent.parent.id'
  | 'id'
  | 'internal.content'
  | 'internal.contentDigest'
  | 'internal.contentFilePath'
  | 'internal.description'
  | 'internal.fieldOwners'
  | 'internal.ignoreType'
  | 'internal.mediaType'
  | 'internal.owner'
  | 'internal.type'
  | 'parent.children'
  | 'parent.children.children'
  | 'parent.children.children.children'
  | 'parent.children.children.id'
  | 'parent.children.id'
  | 'parent.children.internal.content'
  | 'parent.children.internal.contentDigest'
  | 'parent.children.internal.contentFilePath'
  | 'parent.children.internal.description'
  | 'parent.children.internal.fieldOwners'
  | 'parent.children.internal.ignoreType'
  | 'parent.children.internal.mediaType'
  | 'parent.children.internal.owner'
  | 'parent.children.internal.type'
  | 'parent.children.parent.children'
  | 'parent.children.parent.id'
  | 'parent.id'
  | 'parent.internal.content'
  | 'parent.internal.contentDigest'
  | 'parent.internal.contentFilePath'
  | 'parent.internal.description'
  | 'parent.internal.fieldOwners'
  | 'parent.internal.ignoreType'
  | 'parent.internal.mediaType'
  | 'parent.internal.owner'
  | 'parent.internal.type'
  | 'parent.parent.children'
  | 'parent.parent.children.children'
  | 'parent.parent.children.id'
  | 'parent.parent.id'
  | 'parent.parent.internal.content'
  | 'parent.parent.internal.contentDigest'
  | 'parent.parent.internal.contentFilePath'
  | 'parent.parent.internal.description'
  | 'parent.parent.internal.fieldOwners'
  | 'parent.parent.internal.ignoreType'
  | 'parent.parent.internal.mediaType'
  | 'parent.parent.internal.owner'
  | 'parent.parent.internal.type'
  | 'parent.parent.parent.children'
  | 'parent.parent.parent.id';

type SiteBuildMetadataFilterInput = {
  readonly buildTime: InputMaybe<DateQueryOperatorInput>;
  readonly children: InputMaybe<NodeFilterListInput>;
  readonly id: InputMaybe<StringQueryOperatorInput>;
  readonly internal: InputMaybe<InternalFilterInput>;
  readonly parent: InputMaybe<NodeFilterInput>;
};

type SiteBuildMetadataGroupConnection = {
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly edges: ReadonlyArray<SiteBuildMetadataEdge>;
  readonly field: Scalars['String'];
  readonly fieldValue: Maybe<Scalars['String']>;
  readonly group: ReadonlyArray<SiteBuildMetadataGroupConnection>;
  readonly max: Maybe<Scalars['Float']>;
  readonly min: Maybe<Scalars['Float']>;
  readonly nodes: ReadonlyArray<SiteBuildMetadata>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars['Float']>;
  readonly totalCount: Scalars['Int'];
};


type SiteBuildMetadataGroupConnection_distinctArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


type SiteBuildMetadataGroupConnection_groupArgs = {
  field: SiteBuildMetadataFieldsEnum;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
};


type SiteBuildMetadataGroupConnection_maxArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


type SiteBuildMetadataGroupConnection_minArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


type SiteBuildMetadataGroupConnection_sumArgs = {
  field: SiteBuildMetadataFieldsEnum;
};

type SiteBuildMetadataSortInput = {
  readonly fields: InputMaybe<ReadonlyArray<InputMaybe<SiteBuildMetadataFieldsEnum>>>;
  readonly order: InputMaybe<ReadonlyArray<InputMaybe<SortOrderEnum>>>;
};

type SiteConnection = {
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly edges: ReadonlyArray<SiteEdge>;
  readonly group: ReadonlyArray<SiteGroupConnection>;
  readonly max: Maybe<Scalars['Float']>;
  readonly min: Maybe<Scalars['Float']>;
  readonly nodes: ReadonlyArray<Site>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars['Float']>;
  readonly totalCount: Scalars['Int'];
};


type SiteConnection_distinctArgs = {
  field: SiteFieldsEnum;
};


type SiteConnection_groupArgs = {
  field: SiteFieldsEnum;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
};


type SiteConnection_maxArgs = {
  field: SiteFieldsEnum;
};


type SiteConnection_minArgs = {
  field: SiteFieldsEnum;
};


type SiteConnection_sumArgs = {
  field: SiteFieldsEnum;
};

type SiteEdge = {
  readonly next: Maybe<Site>;
  readonly node: Site;
  readonly previous: Maybe<Site>;
};

type SiteFieldsEnum =
  | 'buildTime'
  | 'children'
  | 'children.children'
  | 'children.children.children'
  | 'children.children.children.children'
  | 'children.children.children.id'
  | 'children.children.id'
  | 'children.children.internal.content'
  | 'children.children.internal.contentDigest'
  | 'children.children.internal.contentFilePath'
  | 'children.children.internal.description'
  | 'children.children.internal.fieldOwners'
  | 'children.children.internal.ignoreType'
  | 'children.children.internal.mediaType'
  | 'children.children.internal.owner'
  | 'children.children.internal.type'
  | 'children.children.parent.children'
  | 'children.children.parent.id'
  | 'children.id'
  | 'children.internal.content'
  | 'children.internal.contentDigest'
  | 'children.internal.contentFilePath'
  | 'children.internal.description'
  | 'children.internal.fieldOwners'
  | 'children.internal.ignoreType'
  | 'children.internal.mediaType'
  | 'children.internal.owner'
  | 'children.internal.type'
  | 'children.parent.children'
  | 'children.parent.children.children'
  | 'children.parent.children.id'
  | 'children.parent.id'
  | 'children.parent.internal.content'
  | 'children.parent.internal.contentDigest'
  | 'children.parent.internal.contentFilePath'
  | 'children.parent.internal.description'
  | 'children.parent.internal.fieldOwners'
  | 'children.parent.internal.ignoreType'
  | 'children.parent.internal.mediaType'
  | 'children.parent.internal.owner'
  | 'children.parent.internal.type'
  | 'children.parent.parent.children'
  | 'children.parent.parent.id'
  | 'graphqlTypegen'
  | 'id'
  | 'internal.content'
  | 'internal.contentDigest'
  | 'internal.contentFilePath'
  | 'internal.description'
  | 'internal.fieldOwners'
  | 'internal.ignoreType'
  | 'internal.mediaType'
  | 'internal.owner'
  | 'internal.type'
  | 'jsxRuntime'
  | 'parent.children'
  | 'parent.children.children'
  | 'parent.children.children.children'
  | 'parent.children.children.id'
  | 'parent.children.id'
  | 'parent.children.internal.content'
  | 'parent.children.internal.contentDigest'
  | 'parent.children.internal.contentFilePath'
  | 'parent.children.internal.description'
  | 'parent.children.internal.fieldOwners'
  | 'parent.children.internal.ignoreType'
  | 'parent.children.internal.mediaType'
  | 'parent.children.internal.owner'
  | 'parent.children.internal.type'
  | 'parent.children.parent.children'
  | 'parent.children.parent.id'
  | 'parent.id'
  | 'parent.internal.content'
  | 'parent.internal.contentDigest'
  | 'parent.internal.contentFilePath'
  | 'parent.internal.description'
  | 'parent.internal.fieldOwners'
  | 'parent.internal.ignoreType'
  | 'parent.internal.mediaType'
  | 'parent.internal.owner'
  | 'parent.internal.type'
  | 'parent.parent.children'
  | 'parent.parent.children.children'
  | 'parent.parent.children.id'
  | 'parent.parent.id'
  | 'parent.parent.internal.content'
  | 'parent.parent.internal.contentDigest'
  | 'parent.parent.internal.contentFilePath'
  | 'parent.parent.internal.description'
  | 'parent.parent.internal.fieldOwners'
  | 'parent.parent.internal.ignoreType'
  | 'parent.parent.internal.mediaType'
  | 'parent.parent.internal.owner'
  | 'parent.parent.internal.type'
  | 'parent.parent.parent.children'
  | 'parent.parent.parent.id'
  | 'pathPrefix'
  | 'polyfill'
  | 'siteMetadata.author'
  | 'siteMetadata.description'
  | 'siteMetadata.ogimage'
  | 'siteMetadata.siteUrl'
  | 'siteMetadata.title'
  | 'trailingSlash';

type SiteFilterInput = {
  readonly buildTime: InputMaybe<DateQueryOperatorInput>;
  readonly children: InputMaybe<NodeFilterListInput>;
  readonly graphqlTypegen: InputMaybe<BooleanQueryOperatorInput>;
  readonly id: InputMaybe<StringQueryOperatorInput>;
  readonly internal: InputMaybe<InternalFilterInput>;
  readonly jsxRuntime: InputMaybe<StringQueryOperatorInput>;
  readonly parent: InputMaybe<NodeFilterInput>;
  readonly pathPrefix: InputMaybe<StringQueryOperatorInput>;
  readonly polyfill: InputMaybe<BooleanQueryOperatorInput>;
  readonly siteMetadata: InputMaybe<SiteSiteMetadataFilterInput>;
  readonly trailingSlash: InputMaybe<StringQueryOperatorInput>;
};

type SiteFunction = Node & {
  readonly absoluteCompiledFilePath: Scalars['String'];
  readonly children: ReadonlyArray<Node>;
  readonly functionRoute: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly internal: Internal;
  readonly matchPath: Maybe<Scalars['String']>;
  readonly originalAbsoluteFilePath: Scalars['String'];
  readonly originalRelativeFilePath: Scalars['String'];
  readonly parent: Maybe<Node>;
  readonly pluginName: Scalars['String'];
  readonly relativeCompiledFilePath: Scalars['String'];
};

type SiteFunctionConnection = {
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly edges: ReadonlyArray<SiteFunctionEdge>;
  readonly group: ReadonlyArray<SiteFunctionGroupConnection>;
  readonly max: Maybe<Scalars['Float']>;
  readonly min: Maybe<Scalars['Float']>;
  readonly nodes: ReadonlyArray<SiteFunction>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars['Float']>;
  readonly totalCount: Scalars['Int'];
};


type SiteFunctionConnection_distinctArgs = {
  field: SiteFunctionFieldsEnum;
};


type SiteFunctionConnection_groupArgs = {
  field: SiteFunctionFieldsEnum;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
};


type SiteFunctionConnection_maxArgs = {
  field: SiteFunctionFieldsEnum;
};


type SiteFunctionConnection_minArgs = {
  field: SiteFunctionFieldsEnum;
};


type SiteFunctionConnection_sumArgs = {
  field: SiteFunctionFieldsEnum;
};

type SiteFunctionEdge = {
  readonly next: Maybe<SiteFunction>;
  readonly node: SiteFunction;
  readonly previous: Maybe<SiteFunction>;
};

type SiteFunctionFieldsEnum =
  | 'absoluteCompiledFilePath'
  | 'children'
  | 'children.children'
  | 'children.children.children'
  | 'children.children.children.children'
  | 'children.children.children.id'
  | 'children.children.id'
  | 'children.children.internal.content'
  | 'children.children.internal.contentDigest'
  | 'children.children.internal.contentFilePath'
  | 'children.children.internal.description'
  | 'children.children.internal.fieldOwners'
  | 'children.children.internal.ignoreType'
  | 'children.children.internal.mediaType'
  | 'children.children.internal.owner'
  | 'children.children.internal.type'
  | 'children.children.parent.children'
  | 'children.children.parent.id'
  | 'children.id'
  | 'children.internal.content'
  | 'children.internal.contentDigest'
  | 'children.internal.contentFilePath'
  | 'children.internal.description'
  | 'children.internal.fieldOwners'
  | 'children.internal.ignoreType'
  | 'children.internal.mediaType'
  | 'children.internal.owner'
  | 'children.internal.type'
  | 'children.parent.children'
  | 'children.parent.children.children'
  | 'children.parent.children.id'
  | 'children.parent.id'
  | 'children.parent.internal.content'
  | 'children.parent.internal.contentDigest'
  | 'children.parent.internal.contentFilePath'
  | 'children.parent.internal.description'
  | 'children.parent.internal.fieldOwners'
  | 'children.parent.internal.ignoreType'
  | 'children.parent.internal.mediaType'
  | 'children.parent.internal.owner'
  | 'children.parent.internal.type'
  | 'children.parent.parent.children'
  | 'children.parent.parent.id'
  | 'functionRoute'
  | 'id'
  | 'internal.content'
  | 'internal.contentDigest'
  | 'internal.contentFilePath'
  | 'internal.description'
  | 'internal.fieldOwners'
  | 'internal.ignoreType'
  | 'internal.mediaType'
  | 'internal.owner'
  | 'internal.type'
  | 'matchPath'
  | 'originalAbsoluteFilePath'
  | 'originalRelativeFilePath'
  | 'parent.children'
  | 'parent.children.children'
  | 'parent.children.children.children'
  | 'parent.children.children.id'
  | 'parent.children.id'
  | 'parent.children.internal.content'
  | 'parent.children.internal.contentDigest'
  | 'parent.children.internal.contentFilePath'
  | 'parent.children.internal.description'
  | 'parent.children.internal.fieldOwners'
  | 'parent.children.internal.ignoreType'
  | 'parent.children.internal.mediaType'
  | 'parent.children.internal.owner'
  | 'parent.children.internal.type'
  | 'parent.children.parent.children'
  | 'parent.children.parent.id'
  | 'parent.id'
  | 'parent.internal.content'
  | 'parent.internal.contentDigest'
  | 'parent.internal.contentFilePath'
  | 'parent.internal.description'
  | 'parent.internal.fieldOwners'
  | 'parent.internal.ignoreType'
  | 'parent.internal.mediaType'
  | 'parent.internal.owner'
  | 'parent.internal.type'
  | 'parent.parent.children'
  | 'parent.parent.children.children'
  | 'parent.parent.children.id'
  | 'parent.parent.id'
  | 'parent.parent.internal.content'
  | 'parent.parent.internal.contentDigest'
  | 'parent.parent.internal.contentFilePath'
  | 'parent.parent.internal.description'
  | 'parent.parent.internal.fieldOwners'
  | 'parent.parent.internal.ignoreType'
  | 'parent.parent.internal.mediaType'
  | 'parent.parent.internal.owner'
  | 'parent.parent.internal.type'
  | 'parent.parent.parent.children'
  | 'parent.parent.parent.id'
  | 'pluginName'
  | 'relativeCompiledFilePath';

type SiteFunctionFilterInput = {
  readonly absoluteCompiledFilePath: InputMaybe<StringQueryOperatorInput>;
  readonly children: InputMaybe<NodeFilterListInput>;
  readonly functionRoute: InputMaybe<StringQueryOperatorInput>;
  readonly id: InputMaybe<StringQueryOperatorInput>;
  readonly internal: InputMaybe<InternalFilterInput>;
  readonly matchPath: InputMaybe<StringQueryOperatorInput>;
  readonly originalAbsoluteFilePath: InputMaybe<StringQueryOperatorInput>;
  readonly originalRelativeFilePath: InputMaybe<StringQueryOperatorInput>;
  readonly parent: InputMaybe<NodeFilterInput>;
  readonly pluginName: InputMaybe<StringQueryOperatorInput>;
  readonly relativeCompiledFilePath: InputMaybe<StringQueryOperatorInput>;
};

type SiteFunctionGroupConnection = {
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly edges: ReadonlyArray<SiteFunctionEdge>;
  readonly field: Scalars['String'];
  readonly fieldValue: Maybe<Scalars['String']>;
  readonly group: ReadonlyArray<SiteFunctionGroupConnection>;
  readonly max: Maybe<Scalars['Float']>;
  readonly min: Maybe<Scalars['Float']>;
  readonly nodes: ReadonlyArray<SiteFunction>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars['Float']>;
  readonly totalCount: Scalars['Int'];
};


type SiteFunctionGroupConnection_distinctArgs = {
  field: SiteFunctionFieldsEnum;
};


type SiteFunctionGroupConnection_groupArgs = {
  field: SiteFunctionFieldsEnum;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
};


type SiteFunctionGroupConnection_maxArgs = {
  field: SiteFunctionFieldsEnum;
};


type SiteFunctionGroupConnection_minArgs = {
  field: SiteFunctionFieldsEnum;
};


type SiteFunctionGroupConnection_sumArgs = {
  field: SiteFunctionFieldsEnum;
};

type SiteFunctionSortInput = {
  readonly fields: InputMaybe<ReadonlyArray<InputMaybe<SiteFunctionFieldsEnum>>>;
  readonly order: InputMaybe<ReadonlyArray<InputMaybe<SortOrderEnum>>>;
};

type SiteGroupConnection = {
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly edges: ReadonlyArray<SiteEdge>;
  readonly field: Scalars['String'];
  readonly fieldValue: Maybe<Scalars['String']>;
  readonly group: ReadonlyArray<SiteGroupConnection>;
  readonly max: Maybe<Scalars['Float']>;
  readonly min: Maybe<Scalars['Float']>;
  readonly nodes: ReadonlyArray<Site>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars['Float']>;
  readonly totalCount: Scalars['Int'];
};


type SiteGroupConnection_distinctArgs = {
  field: SiteFieldsEnum;
};


type SiteGroupConnection_groupArgs = {
  field: SiteFieldsEnum;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
};


type SiteGroupConnection_maxArgs = {
  field: SiteFieldsEnum;
};


type SiteGroupConnection_minArgs = {
  field: SiteFieldsEnum;
};


type SiteGroupConnection_sumArgs = {
  field: SiteFieldsEnum;
};

type SitePage = Node & {
  readonly children: ReadonlyArray<Node>;
  readonly component: Scalars['String'];
  readonly componentChunkName: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly internal: Internal;
  readonly internalComponentName: Scalars['String'];
  readonly matchPath: Maybe<Scalars['String']>;
  readonly pageContext: Maybe<Scalars['JSON']>;
  readonly parent: Maybe<Node>;
  readonly path: Scalars['String'];
  readonly pluginCreator: Maybe<SitePlugin>;
};

type SitePageConnection = {
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly edges: ReadonlyArray<SitePageEdge>;
  readonly group: ReadonlyArray<SitePageGroupConnection>;
  readonly max: Maybe<Scalars['Float']>;
  readonly min: Maybe<Scalars['Float']>;
  readonly nodes: ReadonlyArray<SitePage>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars['Float']>;
  readonly totalCount: Scalars['Int'];
};


type SitePageConnection_distinctArgs = {
  field: SitePageFieldsEnum;
};


type SitePageConnection_groupArgs = {
  field: SitePageFieldsEnum;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
};


type SitePageConnection_maxArgs = {
  field: SitePageFieldsEnum;
};


type SitePageConnection_minArgs = {
  field: SitePageFieldsEnum;
};


type SitePageConnection_sumArgs = {
  field: SitePageFieldsEnum;
};

type SitePageEdge = {
  readonly next: Maybe<SitePage>;
  readonly node: SitePage;
  readonly previous: Maybe<SitePage>;
};

type SitePageFieldsEnum =
  | 'children'
  | 'children.children'
  | 'children.children.children'
  | 'children.children.children.children'
  | 'children.children.children.id'
  | 'children.children.id'
  | 'children.children.internal.content'
  | 'children.children.internal.contentDigest'
  | 'children.children.internal.contentFilePath'
  | 'children.children.internal.description'
  | 'children.children.internal.fieldOwners'
  | 'children.children.internal.ignoreType'
  | 'children.children.internal.mediaType'
  | 'children.children.internal.owner'
  | 'children.children.internal.type'
  | 'children.children.parent.children'
  | 'children.children.parent.id'
  | 'children.id'
  | 'children.internal.content'
  | 'children.internal.contentDigest'
  | 'children.internal.contentFilePath'
  | 'children.internal.description'
  | 'children.internal.fieldOwners'
  | 'children.internal.ignoreType'
  | 'children.internal.mediaType'
  | 'children.internal.owner'
  | 'children.internal.type'
  | 'children.parent.children'
  | 'children.parent.children.children'
  | 'children.parent.children.id'
  | 'children.parent.id'
  | 'children.parent.internal.content'
  | 'children.parent.internal.contentDigest'
  | 'children.parent.internal.contentFilePath'
  | 'children.parent.internal.description'
  | 'children.parent.internal.fieldOwners'
  | 'children.parent.internal.ignoreType'
  | 'children.parent.internal.mediaType'
  | 'children.parent.internal.owner'
  | 'children.parent.internal.type'
  | 'children.parent.parent.children'
  | 'children.parent.parent.id'
  | 'component'
  | 'componentChunkName'
  | 'id'
  | 'internalComponentName'
  | 'internal.content'
  | 'internal.contentDigest'
  | 'internal.contentFilePath'
  | 'internal.description'
  | 'internal.fieldOwners'
  | 'internal.ignoreType'
  | 'internal.mediaType'
  | 'internal.owner'
  | 'internal.type'
  | 'matchPath'
  | 'pageContext'
  | 'parent.children'
  | 'parent.children.children'
  | 'parent.children.children.children'
  | 'parent.children.children.id'
  | 'parent.children.id'
  | 'parent.children.internal.content'
  | 'parent.children.internal.contentDigest'
  | 'parent.children.internal.contentFilePath'
  | 'parent.children.internal.description'
  | 'parent.children.internal.fieldOwners'
  | 'parent.children.internal.ignoreType'
  | 'parent.children.internal.mediaType'
  | 'parent.children.internal.owner'
  | 'parent.children.internal.type'
  | 'parent.children.parent.children'
  | 'parent.children.parent.id'
  | 'parent.id'
  | 'parent.internal.content'
  | 'parent.internal.contentDigest'
  | 'parent.internal.contentFilePath'
  | 'parent.internal.description'
  | 'parent.internal.fieldOwners'
  | 'parent.internal.ignoreType'
  | 'parent.internal.mediaType'
  | 'parent.internal.owner'
  | 'parent.internal.type'
  | 'parent.parent.children'
  | 'parent.parent.children.children'
  | 'parent.parent.children.id'
  | 'parent.parent.id'
  | 'parent.parent.internal.content'
  | 'parent.parent.internal.contentDigest'
  | 'parent.parent.internal.contentFilePath'
  | 'parent.parent.internal.description'
  | 'parent.parent.internal.fieldOwners'
  | 'parent.parent.internal.ignoreType'
  | 'parent.parent.internal.mediaType'
  | 'parent.parent.internal.owner'
  | 'parent.parent.internal.type'
  | 'parent.parent.parent.children'
  | 'parent.parent.parent.id'
  | 'path'
  | 'pluginCreator.browserAPIs'
  | 'pluginCreator.children'
  | 'pluginCreator.children.children'
  | 'pluginCreator.children.children.children'
  | 'pluginCreator.children.children.id'
  | 'pluginCreator.children.id'
  | 'pluginCreator.children.internal.content'
  | 'pluginCreator.children.internal.contentDigest'
  | 'pluginCreator.children.internal.contentFilePath'
  | 'pluginCreator.children.internal.description'
  | 'pluginCreator.children.internal.fieldOwners'
  | 'pluginCreator.children.internal.ignoreType'
  | 'pluginCreator.children.internal.mediaType'
  | 'pluginCreator.children.internal.owner'
  | 'pluginCreator.children.internal.type'
  | 'pluginCreator.children.parent.children'
  | 'pluginCreator.children.parent.id'
  | 'pluginCreator.id'
  | 'pluginCreator.internal.content'
  | 'pluginCreator.internal.contentDigest'
  | 'pluginCreator.internal.contentFilePath'
  | 'pluginCreator.internal.description'
  | 'pluginCreator.internal.fieldOwners'
  | 'pluginCreator.internal.ignoreType'
  | 'pluginCreator.internal.mediaType'
  | 'pluginCreator.internal.owner'
  | 'pluginCreator.internal.type'
  | 'pluginCreator.name'
  | 'pluginCreator.nodeAPIs'
  | 'pluginCreator.packageJson'
  | 'pluginCreator.parent.children'
  | 'pluginCreator.parent.children.children'
  | 'pluginCreator.parent.children.id'
  | 'pluginCreator.parent.id'
  | 'pluginCreator.parent.internal.content'
  | 'pluginCreator.parent.internal.contentDigest'
  | 'pluginCreator.parent.internal.contentFilePath'
  | 'pluginCreator.parent.internal.description'
  | 'pluginCreator.parent.internal.fieldOwners'
  | 'pluginCreator.parent.internal.ignoreType'
  | 'pluginCreator.parent.internal.mediaType'
  | 'pluginCreator.parent.internal.owner'
  | 'pluginCreator.parent.internal.type'
  | 'pluginCreator.parent.parent.children'
  | 'pluginCreator.parent.parent.id'
  | 'pluginCreator.pluginFilepath'
  | 'pluginCreator.pluginOptions'
  | 'pluginCreator.resolve'
  | 'pluginCreator.ssrAPIs'
  | 'pluginCreator.version';

type SitePageFilterInput = {
  readonly children: InputMaybe<NodeFilterListInput>;
  readonly component: InputMaybe<StringQueryOperatorInput>;
  readonly componentChunkName: InputMaybe<StringQueryOperatorInput>;
  readonly id: InputMaybe<StringQueryOperatorInput>;
  readonly internal: InputMaybe<InternalFilterInput>;
  readonly internalComponentName: InputMaybe<StringQueryOperatorInput>;
  readonly matchPath: InputMaybe<StringQueryOperatorInput>;
  readonly pageContext: InputMaybe<JSONQueryOperatorInput>;
  readonly parent: InputMaybe<NodeFilterInput>;
  readonly path: InputMaybe<StringQueryOperatorInput>;
  readonly pluginCreator: InputMaybe<SitePluginFilterInput>;
};

type SitePageGroupConnection = {
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly edges: ReadonlyArray<SitePageEdge>;
  readonly field: Scalars['String'];
  readonly fieldValue: Maybe<Scalars['String']>;
  readonly group: ReadonlyArray<SitePageGroupConnection>;
  readonly max: Maybe<Scalars['Float']>;
  readonly min: Maybe<Scalars['Float']>;
  readonly nodes: ReadonlyArray<SitePage>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars['Float']>;
  readonly totalCount: Scalars['Int'];
};


type SitePageGroupConnection_distinctArgs = {
  field: SitePageFieldsEnum;
};


type SitePageGroupConnection_groupArgs = {
  field: SitePageFieldsEnum;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
};


type SitePageGroupConnection_maxArgs = {
  field: SitePageFieldsEnum;
};


type SitePageGroupConnection_minArgs = {
  field: SitePageFieldsEnum;
};


type SitePageGroupConnection_sumArgs = {
  field: SitePageFieldsEnum;
};

type SitePageSortInput = {
  readonly fields: InputMaybe<ReadonlyArray<InputMaybe<SitePageFieldsEnum>>>;
  readonly order: InputMaybe<ReadonlyArray<InputMaybe<SortOrderEnum>>>;
};

type SitePlugin = Node & {
  readonly browserAPIs: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly children: ReadonlyArray<Node>;
  readonly id: Scalars['ID'];
  readonly internal: Internal;
  readonly name: Maybe<Scalars['String']>;
  readonly nodeAPIs: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly packageJson: Maybe<Scalars['JSON']>;
  readonly parent: Maybe<Node>;
  readonly pluginFilepath: Maybe<Scalars['String']>;
  readonly pluginOptions: Maybe<Scalars['JSON']>;
  readonly resolve: Maybe<Scalars['String']>;
  readonly ssrAPIs: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly version: Maybe<Scalars['String']>;
};

type SitePluginConnection = {
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly edges: ReadonlyArray<SitePluginEdge>;
  readonly group: ReadonlyArray<SitePluginGroupConnection>;
  readonly max: Maybe<Scalars['Float']>;
  readonly min: Maybe<Scalars['Float']>;
  readonly nodes: ReadonlyArray<SitePlugin>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars['Float']>;
  readonly totalCount: Scalars['Int'];
};


type SitePluginConnection_distinctArgs = {
  field: SitePluginFieldsEnum;
};


type SitePluginConnection_groupArgs = {
  field: SitePluginFieldsEnum;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
};


type SitePluginConnection_maxArgs = {
  field: SitePluginFieldsEnum;
};


type SitePluginConnection_minArgs = {
  field: SitePluginFieldsEnum;
};


type SitePluginConnection_sumArgs = {
  field: SitePluginFieldsEnum;
};

type SitePluginEdge = {
  readonly next: Maybe<SitePlugin>;
  readonly node: SitePlugin;
  readonly previous: Maybe<SitePlugin>;
};

type SitePluginFieldsEnum =
  | 'browserAPIs'
  | 'children'
  | 'children.children'
  | 'children.children.children'
  | 'children.children.children.children'
  | 'children.children.children.id'
  | 'children.children.id'
  | 'children.children.internal.content'
  | 'children.children.internal.contentDigest'
  | 'children.children.internal.contentFilePath'
  | 'children.children.internal.description'
  | 'children.children.internal.fieldOwners'
  | 'children.children.internal.ignoreType'
  | 'children.children.internal.mediaType'
  | 'children.children.internal.owner'
  | 'children.children.internal.type'
  | 'children.children.parent.children'
  | 'children.children.parent.id'
  | 'children.id'
  | 'children.internal.content'
  | 'children.internal.contentDigest'
  | 'children.internal.contentFilePath'
  | 'children.internal.description'
  | 'children.internal.fieldOwners'
  | 'children.internal.ignoreType'
  | 'children.internal.mediaType'
  | 'children.internal.owner'
  | 'children.internal.type'
  | 'children.parent.children'
  | 'children.parent.children.children'
  | 'children.parent.children.id'
  | 'children.parent.id'
  | 'children.parent.internal.content'
  | 'children.parent.internal.contentDigest'
  | 'children.parent.internal.contentFilePath'
  | 'children.parent.internal.description'
  | 'children.parent.internal.fieldOwners'
  | 'children.parent.internal.ignoreType'
  | 'children.parent.internal.mediaType'
  | 'children.parent.internal.owner'
  | 'children.parent.internal.type'
  | 'children.parent.parent.children'
  | 'children.parent.parent.id'
  | 'id'
  | 'internal.content'
  | 'internal.contentDigest'
  | 'internal.contentFilePath'
  | 'internal.description'
  | 'internal.fieldOwners'
  | 'internal.ignoreType'
  | 'internal.mediaType'
  | 'internal.owner'
  | 'internal.type'
  | 'name'
  | 'nodeAPIs'
  | 'packageJson'
  | 'parent.children'
  | 'parent.children.children'
  | 'parent.children.children.children'
  | 'parent.children.children.id'
  | 'parent.children.id'
  | 'parent.children.internal.content'
  | 'parent.children.internal.contentDigest'
  | 'parent.children.internal.contentFilePath'
  | 'parent.children.internal.description'
  | 'parent.children.internal.fieldOwners'
  | 'parent.children.internal.ignoreType'
  | 'parent.children.internal.mediaType'
  | 'parent.children.internal.owner'
  | 'parent.children.internal.type'
  | 'parent.children.parent.children'
  | 'parent.children.parent.id'
  | 'parent.id'
  | 'parent.internal.content'
  | 'parent.internal.contentDigest'
  | 'parent.internal.contentFilePath'
  | 'parent.internal.description'
  | 'parent.internal.fieldOwners'
  | 'parent.internal.ignoreType'
  | 'parent.internal.mediaType'
  | 'parent.internal.owner'
  | 'parent.internal.type'
  | 'parent.parent.children'
  | 'parent.parent.children.children'
  | 'parent.parent.children.id'
  | 'parent.parent.id'
  | 'parent.parent.internal.content'
  | 'parent.parent.internal.contentDigest'
  | 'parent.parent.internal.contentFilePath'
  | 'parent.parent.internal.description'
  | 'parent.parent.internal.fieldOwners'
  | 'parent.parent.internal.ignoreType'
  | 'parent.parent.internal.mediaType'
  | 'parent.parent.internal.owner'
  | 'parent.parent.internal.type'
  | 'parent.parent.parent.children'
  | 'parent.parent.parent.id'
  | 'pluginFilepath'
  | 'pluginOptions'
  | 'resolve'
  | 'ssrAPIs'
  | 'version';

type SitePluginFilterInput = {
  readonly browserAPIs: InputMaybe<StringQueryOperatorInput>;
  readonly children: InputMaybe<NodeFilterListInput>;
  readonly id: InputMaybe<StringQueryOperatorInput>;
  readonly internal: InputMaybe<InternalFilterInput>;
  readonly name: InputMaybe<StringQueryOperatorInput>;
  readonly nodeAPIs: InputMaybe<StringQueryOperatorInput>;
  readonly packageJson: InputMaybe<JSONQueryOperatorInput>;
  readonly parent: InputMaybe<NodeFilterInput>;
  readonly pluginFilepath: InputMaybe<StringQueryOperatorInput>;
  readonly pluginOptions: InputMaybe<JSONQueryOperatorInput>;
  readonly resolve: InputMaybe<StringQueryOperatorInput>;
  readonly ssrAPIs: InputMaybe<StringQueryOperatorInput>;
  readonly version: InputMaybe<StringQueryOperatorInput>;
};

type SitePluginGroupConnection = {
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly edges: ReadonlyArray<SitePluginEdge>;
  readonly field: Scalars['String'];
  readonly fieldValue: Maybe<Scalars['String']>;
  readonly group: ReadonlyArray<SitePluginGroupConnection>;
  readonly max: Maybe<Scalars['Float']>;
  readonly min: Maybe<Scalars['Float']>;
  readonly nodes: ReadonlyArray<SitePlugin>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars['Float']>;
  readonly totalCount: Scalars['Int'];
};


type SitePluginGroupConnection_distinctArgs = {
  field: SitePluginFieldsEnum;
};


type SitePluginGroupConnection_groupArgs = {
  field: SitePluginFieldsEnum;
  limit: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
};


type SitePluginGroupConnection_maxArgs = {
  field: SitePluginFieldsEnum;
};


type SitePluginGroupConnection_minArgs = {
  field: SitePluginFieldsEnum;
};


type SitePluginGroupConnection_sumArgs = {
  field: SitePluginFieldsEnum;
};

type SitePluginSortInput = {
  readonly fields: InputMaybe<ReadonlyArray<InputMaybe<SitePluginFieldsEnum>>>;
  readonly order: InputMaybe<ReadonlyArray<InputMaybe<SortOrderEnum>>>;
};

type SiteSiteMetadata = {
  readonly author: Maybe<Scalars['String']>;
  readonly description: Maybe<Scalars['String']>;
  readonly ogimage: Maybe<Scalars['String']>;
  readonly siteUrl: Maybe<Scalars['String']>;
  readonly title: Maybe<Scalars['String']>;
};

type SiteSiteMetadataFilterInput = {
  readonly author: InputMaybe<StringQueryOperatorInput>;
  readonly description: InputMaybe<StringQueryOperatorInput>;
  readonly ogimage: InputMaybe<StringQueryOperatorInput>;
  readonly siteUrl: InputMaybe<StringQueryOperatorInput>;
  readonly title: InputMaybe<StringQueryOperatorInput>;
};

type SiteSortInput = {
  readonly fields: InputMaybe<ReadonlyArray<InputMaybe<SiteFieldsEnum>>>;
  readonly order: InputMaybe<ReadonlyArray<InputMaybe<SortOrderEnum>>>;
};

type SortOrderEnum =
  | 'ASC'
  | 'DESC';

type StringQueryOperatorInput = {
  readonly eq: InputMaybe<Scalars['String']>;
  readonly glob: InputMaybe<Scalars['String']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly ne: InputMaybe<Scalars['String']>;
  readonly nin: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly regex: InputMaybe<Scalars['String']>;
};

type AppWritingTableQueryVariables = Exact<{ [key: string]: never; }>;


type AppWritingTableQuery = { readonly appWritingData: { readonly edges: ReadonlyArray<{ readonly node: { readonly data: { readonly name: string | null, readonly description: string | null, readonly discussion: string | null, readonly source: string | null, readonly record_id: string | null, readonly order: number | null } | null } }> } };

type ArticleQueryVariables = Exact<{
  id: InputMaybe<Scalars['String']>;
  category: InputMaybe<Scalars['String']>;
  airTableName: InputMaybe<Scalars['String']>;
}>;


type ArticleQuery = { readonly mdx: { readonly id: string, readonly body: string, readonly headings: ReadonlyArray<{ readonly depth: number | null, readonly value: string | null } | null> | null, readonly frontmatter: { readonly title: string, readonly description: string } | null, readonly fields: { readonly category: string | null, readonly hierarchy: string | null, readonly slug: string | null } | null } | null, readonly parentCategoryAllMdx: { readonly edges: ReadonlyArray<{ readonly node: { readonly frontmatter: { readonly title: string, readonly order: number | null } | null, readonly fields: { readonly category: string | null, readonly slug: string | null } | null } }> }, readonly airTable: { readonly edges: ReadonlyArray<{ readonly node: { readonly data: { readonly name: string | null, readonly description: string | null, readonly discussion: string | null, readonly source: string | null, readonly record_id: string | null, readonly order: number | null } | null } }> } };

type BasicConceptTableQueryVariables = Exact<{ [key: string]: never; }>;


type BasicConceptTableQuery = { readonly basicConceptData: { readonly edges: ReadonlyArray<{ readonly node: { readonly data: { readonly name: string | null, readonly description: string | null, readonly discussion: string | null, readonly source: string | null, readonly record_id: string | null, readonly order: number | null } | null } }> } };

type FooterQueryVariables = Exact<{ [key: string]: never; }>;


type FooterQuery = { readonly concept: { readonly nodes: ReadonlyArray<{ readonly id: string, readonly frontmatter: { readonly title: string } | null, readonly fields: { readonly slug: string | null } | null }> }, readonly foundation: { readonly nodes: ReadonlyArray<{ readonly id: string, readonly frontmatter: { readonly title: string } | null, readonly fields: { readonly slug: string | null } | null }> }, readonly basics: { readonly nodes: ReadonlyArray<{ readonly id: string, readonly frontmatter: { readonly title: string } | null, readonly fields: { readonly slug: string | null } | null }> }, readonly accessibility: { readonly nodes: ReadonlyArray<{ readonly id: string, readonly frontmatter: { readonly title: string } | null, readonly fields: { readonly slug: string | null } | null }> }, readonly products: { readonly nodes: ReadonlyArray<{ readonly id: string, readonly frontmatter: { readonly title: string } | null, readonly fields: { readonly slug: string | null } | null }> }, readonly communication: { readonly nodes: ReadonlyArray<{ readonly id: string, readonly frontmatter: { readonly title: string } | null, readonly fields: { readonly slug: string | null } | null }> } };

type HeadQueryVariables = Exact<{ [key: string]: never; }>;


type HeadQuery = { readonly site: { readonly siteMetadata: { readonly title: string | null, readonly description: string | null, readonly siteUrl: string | null, readonly author: string | null, readonly ogimage: string | null } | null } | null };

type IdiomaticUsageTableQueryVariables = Exact<{ [key: string]: never; }>;


type IdiomaticUsageTableQuery = { readonly idiomaticUsageData: { readonly edges: ReadonlyArray<{ readonly node: { readonly data: { readonly label: string | null, readonly ng_example: string | null, readonly ok_example: string | null, readonly expected: string | null, readonly reason: ReadonlyArray<string | null> | null, readonly record_id: string | null } | null } }> }, readonly idiomaticUsageReason: { readonly edges: ReadonlyArray<{ readonly node: { readonly data: { readonly name: string | null, readonly description: string | null, readonly discussion: string | null, readonly source: string | null, readonly record_id: string | null, readonly data: ReadonlyArray<string | null> | null, readonly order: number | null } | null } }> }, readonly writingStyle: { readonly edges: ReadonlyArray<{ readonly node: { readonly data: { readonly name: string | null, readonly data: ReadonlyArray<string | null> | null, readonly record_id: string | null } | null } }> } };

type PageListQueryVariables = Exact<{ [key: string]: never; }>;


type PageListQuery = { readonly childPageAllMdx: { readonly edges: ReadonlyArray<{ readonly node: { readonly frontmatter: { readonly title: string, readonly description: string, readonly order: number | null } | null, readonly fields: { readonly slug: string | null } | null } }> } };

type SearchQueryVariables = Exact<{ [key: string]: never; }>;


type SearchQuery = { readonly allMdx: { readonly nodes: ReadonlyArray<{ readonly frontmatter: { readonly title: string, readonly order: number | null } | null, readonly fields: { readonly category: string | null, readonly hierarchy: string | null, readonly slug: string | null } | null }> } };

type StoryDataQueryVariables = Exact<{ [key: string]: never; }>;


type StoryDataQuery = { readonly allMdx: { readonly nodes: ReadonlyArray<{ readonly frontmatter: { readonly storyName: string | null } | null, readonly fields: { readonly storyData: { readonly code: string | null, readonly groupPath: string | null, readonly storyItems: ReadonlyArray<{ readonly label: string | null, readonly name: string | null, readonly iframeName: string | null } | null> | null } | null } | null }> } };


}
