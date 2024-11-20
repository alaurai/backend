/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AttendanceAPI } from './presentation/api/attendances';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BookClubClassAPI } from './presentation/api/book-club-class';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BookEvaluationAPI } from './presentation/api/book-evaluation';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { NotebookAPI } from './presentation/api/notebooks';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PepAPI } from './presentation/api/pep-class';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UnsecuredVolunteerAPI } from './presentation/api/unsecured-volunteer';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { VolunteerAPI } from './presentation/api/volunteer';
import { expressAuthentication } from './presentation/middlewares/authentication';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import { iocContainer } from './ioc';
import type { IocContainer, IocContainerFactory } from '@tsoa/runtime';
import type { RequestHandler, Router } from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "FieldErrors": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": {"dataType":"nestedObjectLiteral","nestedProperties":{"value":{"dataType":"any"},"message":{"dataType":"string","required":true}}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AttendanceEntity": {
        "dataType": "refAlias",

        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"submissionDate":{"dataType":"datetime","required":true},"expressYourself":{"dataType":"string"},"whatChallengedYou":{"dataType":"string"},"differentKnowledgeLearned":{"dataType":"string"},"applicableKnowledge":{"dataType":"string"},"howCanWeImprove":{"dataType":"string"},"studyRetention":{"dataType":"string","required":true},"enoughTime":{"dataType":"string","required":true},"workshopSubject":{"dataType":"string","required":true},"idAttend":{"dataType":"double","required":true},"idpep":{"dataType":"double","required":true},"idvol":{"dataType":"double","required":true}},"validators":{}},
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"submissionDate":{"dataType":"datetime","required":true},"expressYourself":{"dataType":"string"},"whatChallengedYou":{"dataType":"string"},"differentKnowledgeLearned":{"dataType":"string"},"applicableKnowledge":{"dataType":"string"},"howCanWeImprove":{"dataType":"string"},"studyRetention":{"dataType":"string","required":true},"enoughTime":{"dataType":"string","required":true},"workshopSubject":{"dataType":"string","required":true},"idAttend":{"dataType":"double","required":true},"idpep":{"dataType":"double"},"idvol":{"dataType":"double","required":true}},"validators":{}},

    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AttendanceInfoEntity": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"AttendanceEntity"},{"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaginationResult_AttendanceInfoEntity-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"totalCount":{"dataType":"double","required":true},"pageInfo":{"dataType":"nestedObjectLiteral","nestedProperties":{"hasPreviousPage":{"dataType":"boolean","required":true},"hasNextPage":{"dataType":"boolean","required":true},"page":{"dataType":"double","required":true}},"required":true},"nodes":{"dataType":"array","array":{"dataType":"refAlias","ref":"AttendanceInfoEntity"},"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaginationResult_unknown_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"totalCount":{"dataType":"double","required":true},"pageInfo":{"dataType":"nestedObjectLiteral","nestedProperties":{"hasPreviousPage":{"dataType":"boolean","required":true},"hasNextPage":{"dataType":"boolean","required":true},"page":{"dataType":"double","required":true}},"required":true},"nodes":{"dataType":"any","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_AttendanceEntity.idAttend-or-workshopSubject-or-submissionDate_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"idAttend":{"dataType":"double","required":true},"workshopSubject":{"dataType":"string","required":true},"submissionDate":{"dataType":"datetime","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WorkshopAttendanceRowEntity": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_AttendanceEntity.idAttend-or-workshopSubject-or-submissionDate_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ErrorName": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["VOLUNTEER_NOT_FOUND"]},{"dataType":"enum","enums":["VOLUNTEER_ALREADY_EXISTS"]},{"dataType":"enum","enums":["VOLUNTEER_NOT_UPDATED"]},{"dataType":"enum","enums":["VOLUNTEER_UNREGISTERED"]},{"dataType":"enum","enums":["VOLUNTEER_NOT_DELETED"]},{"dataType":"enum","enums":["PASSWORD_WRONG_ERROR"]},{"dataType":"enum","enums":["VOLUNTEER_NOT_DELETED"]},{"dataType":"enum","enums":["INVALID_DATE_REGISTER"]},{"dataType":"enum","enums":["HOURS_ALREADY_REGISTERED"]},{"dataType":"enum","enums":["HOURS_NOT_FOUND"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "VolunteerError": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"union","subSchemas":[{"ref":"ErrorName"},{"dataType":"enum","enums":["UNSPECIFIED_ERROR"]}],"required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
            "details": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AttendanceError": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"union","subSchemas":[{"ref":"ErrorName"},{"dataType":"enum","enums":["UNSPECIFIED_ERROR"]}],"required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
            "details": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_AttendanceEntity.Exclude_keyofAttendanceEntity.idAttend-or-submissionDate__": {
        "dataType": "refAlias",

        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"workshopSubject":{"dataType":"string","required":true},"idvol":{"dataType":"double","required":true},"idpep":{"dataType":"double","required":true},"enoughTime":{"dataType":"string","required":true},"studyRetention":{"dataType":"string","required":true},"howCanWeImprove":{"dataType":"string"},"applicableKnowledge":{"dataType":"string"},"differentKnowledgeLearned":{"dataType":"string"},"whatChallengedYou":{"dataType":"string"},"expressYourself":{"dataType":"string"}},"validators":{}},

        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"workshopSubject":{"dataType":"string","required":true},"idvol":{"dataType":"double","required":true},"idpep":{"dataType":"double"},"enoughTime":{"dataType":"string","required":true},"studyRetention":{"dataType":"string","required":true},"howCanWeImprove":{"dataType":"string"},"applicableKnowledge":{"dataType":"string"},"differentKnowledgeLearned":{"dataType":"string"},"whatChallengedYou":{"dataType":"string"},"expressYourself":{"dataType":"string"}},"validators":{}},

    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_AttendanceEntity.idAttend-or-submissionDate_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_AttendanceEntity.Exclude_keyofAttendanceEntity.idAttend-or-submissionDate__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SubmitAttendanceEntity": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_AttendanceEntity.idAttend-or-submissionDate_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookClassAllInfo": {
        "dataType": "refObject",
        "properties": {
            "idclass": {"dataType":"double","required":true},
            "reportReceiveDate": {"dataType":"datetime","required":true},
            "loanDate": {"dataType":"datetime"},
            "returnDate": {"dataType":"datetime"},
            "reportElaborationDate": {"dataType":"datetime"},
            "received": {"dataType":"string"},
            "yesList": {"dataType":"string"},
            "presenceList": {"dataType":"double"},
            "qrl": {"dataType":"double","required":true},
            "sendDateParec": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "presSedex": {"dataType":"string"},
            "sendDateFunap": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "presSedex2": {"dataType":"string"},
            "endEvaluationDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "parec": {"dataType":"string"},
            "idvol": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "folderLink": {"dataType":"string"},
            "place": {"dataType":"double","required":true},
            "placeName": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "volunteerName": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaginationResult_BookClassAllInfo-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"totalCount":{"dataType":"double","required":true},"pageInfo":{"dataType":"nestedObjectLiteral","nestedProperties":{"hasPreviousPage":{"dataType":"boolean","required":true},"hasNextPage":{"dataType":"boolean","required":true},"page":{"dataType":"double","required":true}},"required":true},"nodes":{"dataType":"array","array":{"dataType":"refObject","ref":"BookClassAllInfo"},"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookClubClassError": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"union","subSchemas":[{"ref":"ErrorName"},{"dataType":"enum","enums":["UNSPECIFIED_ERROR"]}],"required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
            "details": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AvailableClassRowEntity": {
        "dataType": "refObject",
        "properties": {
            "idclass": {"dataType":"double","required":true},
            "place": {"dataType":"string"},
            "dateReserved": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "dateConcluded": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "folderLink": {"dataType":"string"},
            "numEvaluations": {"dataType":"double","required":true},
            "totalEssays": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_VolunteerEntity.idvol_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"idvol":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_BookClubClassEntity.idclass_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"idclass":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReserveClassDataEntity": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_VolunteerEntity.idvol_"},{"ref":"Pick_BookClubClassEntity.idclass_"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlaceEntity": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"closed":{"dataType":"double","required":true},"sex":{"dataType":"string"},"addr":{"dataType":"string"},"mode":{"dataType":"string"},"coord":{"dataType":"string"},"fullName":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookEvaluationEntity": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"createdAt":{"dataType":"datetime","required":true},"observedHistories":{"dataType":"string"},"readHistories":{"dataType":"array","array":{"dataType":"string"},"required":true},"relevantPhrases":{"dataType":"string"},"concept":{"dataType":"string","required":true},"observations":{"dataType":"string","required":true},"syntheticAvaliation":{"dataType":"string","required":true},"grammarAvaliation":{"dataType":"string","required":true},"societyCriticalAnalysisAvaliation":{"dataType":"string","required":true},"bookCriticalAnalysisAvaliation":{"dataType":"string","required":true},"textClarityAvaliation":{"dataType":"string","required":true},"textReliabilityAvaliation":{"dataType":"string","required":true},"textAestheticsAvaliation":{"dataType":"string","required":true},"isAppropriation":{"dataType":"boolean","required":true},"isParcialPlagiarism":{"dataType":"boolean","required":true},"evaluatorId":{"dataType":"double","required":true},"classId":{"dataType":"double","required":true},"readerRegistration":{"dataType":"double","required":true},"readerName":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AssociatedBCCEntity": {
        "dataType": "refObject",
        "properties": {
            "idclass": {"dataType":"double","required":true},
            "reportReceiveDate": {"dataType":"datetime","required":true},
            "loanDate": {"dataType":"datetime"},
            "returnDate": {"dataType":"datetime"},
            "reportElaborationDate": {"dataType":"datetime"},
            "received": {"dataType":"string"},
            "yesList": {"dataType":"string"},
            "presenceList": {"dataType":"double"},
            "qrl": {"dataType":"double","required":true},
            "sendDateParec": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "presSedex": {"dataType":"string"},
            "sendDateFunap": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "presSedex2": {"dataType":"string"},
            "endEvaluationDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "parec": {"dataType":"string"},
            "idvol": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "folderLink": {"dataType":"string"},
            "place": {"dataType":"union","subSchemas":[{"ref":"PlaceEntity"},{"dataType":"undefined"}],"required":true},
            "bookEvaluations": {"dataType":"array","array":{"dataType":"refAlias","ref":"BookEvaluationEntity"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_AssociatedBCCEntity.Exclude_keyofAssociatedBCCEntity.idclass-or-idvol-or-place__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"reportReceiveDate":{"dataType":"datetime","required":true},"loanDate":{"dataType":"datetime"},"returnDate":{"dataType":"datetime"},"reportElaborationDate":{"dataType":"datetime"},"received":{"dataType":"string"},"yesList":{"dataType":"string"},"presenceList":{"dataType":"double"},"qrl":{"dataType":"double","required":true},"sendDateParec":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},"presSedex":{"dataType":"string"},"sendDateFunap":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},"presSedex2":{"dataType":"string"},"endEvaluationDate":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},"parec":{"dataType":"string"},"folderLink":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_AssociatedBCCEntity.idclass-or-idvol-or-place_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_AssociatedBCCEntity.Exclude_keyofAssociatedBCCEntity.idclass-or-idvol-or-place__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateBCClassEntity": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_AssociatedBCCEntity.idclass-or-idvol-or-place_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookEvaluationList": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"BookEvaluationEntity"},{"dataType":"nestedObjectLiteral","nestedProperties":{"volunteerName":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"expirationDate":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaginationResult_BookEvaluationList-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"totalCount":{"dataType":"double","required":true},"pageInfo":{"dataType":"nestedObjectLiteral","nestedProperties":{"hasPreviousPage":{"dataType":"boolean","required":true},"hasNextPage":{"dataType":"boolean","required":true},"page":{"dataType":"double","required":true}},"required":true},"nodes":{"dataType":"array","array":{"dataType":"refAlias","ref":"BookEvaluationList"},"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_BookEvaluationEntity.Exclude_keyofBookEvaluationEntity.id-or-createdAt__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"readerName":{"dataType":"string","required":true},"readerRegistration":{"dataType":"double","required":true},"classId":{"dataType":"double","required":true},"evaluatorId":{"dataType":"double","required":true},"isParcialPlagiarism":{"dataType":"boolean","required":true},"isAppropriation":{"dataType":"boolean","required":true},"textAestheticsAvaliation":{"dataType":"string","required":true},"textReliabilityAvaliation":{"dataType":"string","required":true},"textClarityAvaliation":{"dataType":"string","required":true},"bookCriticalAnalysisAvaliation":{"dataType":"string","required":true},"societyCriticalAnalysisAvaliation":{"dataType":"string","required":true},"grammarAvaliation":{"dataType":"string","required":true},"syntheticAvaliation":{"dataType":"string","required":true},"observations":{"dataType":"string","required":true},"concept":{"dataType":"string","required":true},"relevantPhrases":{"dataType":"string"},"readHistories":{"dataType":"array","array":{"dataType":"string"},"required":true},"observedHistories":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_BookEvaluationEntity.id-or-createdAt_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_BookEvaluationEntity.Exclude_keyofBookEvaluationEntity.id-or-createdAt__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateBookEvaluationEntity": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_BookEvaluationEntity.id-or-createdAt_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookEvaluationError": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"union","subSchemas":[{"ref":"ErrorName"},{"dataType":"enum","enums":["UNSPECIFIED_ERROR"]}],"required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
            "details": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_BookEvaluationEntity.Exclude_keyofBookEvaluationEntity.id-or-classId-or-evaluatorId__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"createdAt":{"dataType":"datetime","required":true},"readerName":{"dataType":"string","required":true},"readerRegistration":{"dataType":"double","required":true},"isParcialPlagiarism":{"dataType":"boolean","required":true},"isAppropriation":{"dataType":"boolean","required":true},"textAestheticsAvaliation":{"dataType":"string","required":true},"textReliabilityAvaliation":{"dataType":"string","required":true},"textClarityAvaliation":{"dataType":"string","required":true},"bookCriticalAnalysisAvaliation":{"dataType":"string","required":true},"societyCriticalAnalysisAvaliation":{"dataType":"string","required":true},"grammarAvaliation":{"dataType":"string","required":true},"syntheticAvaliation":{"dataType":"string","required":true},"observations":{"dataType":"string","required":true},"concept":{"dataType":"string","required":true},"relevantPhrases":{"dataType":"string"},"readHistories":{"dataType":"array","array":{"dataType":"string"},"required":true},"observedHistories":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_BookEvaluationEntity.id-or-classId-or-evaluatorId_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_BookEvaluationEntity.Exclude_keyofBookEvaluationEntity.id-or-classId-or-evaluatorId__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateBookEvaluationEntity": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_BookEvaluationEntity.id-or-classId-or-evaluatorId_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NotebookWithPlaceAndVolunteer": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"reservationDate":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]},{"dataType":"undefined"}],"required":true},"idpep":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]},{"dataType":"undefined"}],"required":true},"evaluatorName":{"dataType":"string","required":true},"fullName":{"dataType":"string","required":true},"studentRegistration":{"dataType":"string","required":true},"studentName":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaginationResult_NotebookWithPlaceAndVolunteer-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"totalCount":{"dataType":"double","required":true},"pageInfo":{"dataType":"nestedObjectLiteral","nestedProperties":{"hasPreviousPage":{"dataType":"boolean","required":true},"hasNextPage":{"dataType":"boolean","required":true},"page":{"dataType":"double","required":true}},"required":true},"nodes":{"dataType":"array","array":{"dataType":"refAlias","ref":"NotebookWithPlaceAndVolunteer"},"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NotebookError": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"union","subSchemas":[{"ref":"ErrorName"},{"dataType":"enum","enums":["UNSPECIFIED_ERROR"]}],"required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
            "details": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AvailableNotebookRowEntity": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"notebookPath":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"reservationDate":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},"studentName":{"dataType":"string","required":true},"classId":{"dataType":"double","required":true},"studentId":{"dataType":"double","required":true},"notebookId":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_PepClassEntity.notebookDirectory_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"notebookDirectory":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NotebookEntity": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{"reservationDate":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},"evaluatedDate":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},"archivesExclusion":{"dataType":"boolean","required":true},"approved":{"dataType":"boolean","required":true},"conclusion":{"dataType":"string","required":true},"a13":{"dataType":"string"},"a12":{"dataType":"string"},"a11":{"dataType":"string"},"a10":{"dataType":"string"},"a9":{"dataType":"string"},"a8":{"dataType":"string"},"a7":{"dataType":"string"},"a6":{"dataType":"string"},"a5":{"dataType":"string"},"a4":{"dataType":"string"},"a3":{"dataType":"string"},"a2":{"dataType":"string"},"a1":{"dataType":"string"},"relevantContent":{"dataType":"string"},"subject10":{"dataType":"string"},"subject9":{"dataType":"string"},"subject8":{"dataType":"string"},"subject7":{"dataType":"string"},"subject6":{"dataType":"string"},"subject5":{"dataType":"string"},"subject4":{"dataType":"string"},"subject3":{"dataType":"string"},"subject2":{"dataType":"string"},"subject1":{"dataType":"string"},"evaluatorEmail":{"dataType":"string"},"evaluatorName":{"dataType":"string","required":true},"studentPrisonUnit":{"dataType":"string"},"studentRegistration":{"dataType":"double","required":true},"studentName":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"idpep":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},"idvol":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},"idcad":{"dataType":"double","required":true}}},{"ref":"Pick_PepClassEntity.notebookDirectory_"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_NotebookEntity.Exclude_keyofNotebookEntity.-or-idcad-or-studentName-or-studentRegistration-or-idpep-or-reservationDate-or-evaluatedDate-or-notebookDirectory__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"idvol":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},"studentPrisonUnit":{"dataType":"string"},"evaluatorName":{"dataType":"string","required":true},"evaluatorEmail":{"dataType":"string"},"subject1":{"dataType":"string"},"subject2":{"dataType":"string"},"subject3":{"dataType":"string"},"subject4":{"dataType":"string"},"subject5":{"dataType":"string"},"subject6":{"dataType":"string"},"subject7":{"dataType":"string"},"subject8":{"dataType":"string"},"subject9":{"dataType":"string"},"subject10":{"dataType":"string"},"relevantContent":{"dataType":"string"},"a1":{"dataType":"string"},"a2":{"dataType":"string"},"a3":{"dataType":"string"},"a4":{"dataType":"string"},"a5":{"dataType":"string"},"a6":{"dataType":"string"},"a7":{"dataType":"string"},"a8":{"dataType":"string"},"a9":{"dataType":"string"},"a10":{"dataType":"string"},"a11":{"dataType":"string"},"a12":{"dataType":"string"},"a13":{"dataType":"string"},"conclusion":{"dataType":"string","required":true},"approved":{"dataType":"boolean","required":true},"archivesExclusion":{"dataType":"boolean","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_%2F%2Feslint-disable-next-lineprettier%2FprettierNotebookEntity.-or-idcad-or-studentName-or-studentRegistration-or-idpep-or-reservationDate-or-evaluatedDate-or-notebookDirectory_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_NotebookEntity.Exclude_keyofNotebookEntity.-or-idcad-or-studentName-or-studentRegistration-or-idpep-or-reservationDate-or-evaluatedDate-or-notebookDirectory__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EvaluateNotebookEntity": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_%2F%2Feslint-disable-next-lineprettier%2FprettierNotebookEntity.-or-idcad-or-studentName-or-studentRegistration-or-idpep-or-reservationDate-or-evaluatedDate-or-notebookDirectory_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_AvailableNotebookRowEntity.notebookId_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"notebookId":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReserveNotebookDataEntity": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_VolunteerEntity.idvol_"},{"ref":"Pick_AvailableNotebookRowEntity.notebookId_"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_NotebookEntity.Exclude_keyofNotebookEntity.-or-idcad-or-idvol-or-idpep-or-studentName-or-studentRegistration-or-studentPrisonUnit-or-evaluatorName-or-evaluatorEmail-or-notebookDirectory__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"reservationDate":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},"evaluatedDate":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},"subject1":{"dataType":"string"},"subject2":{"dataType":"string"},"subject3":{"dataType":"string"},"subject4":{"dataType":"string"},"subject5":{"dataType":"string"},"subject6":{"dataType":"string"},"subject7":{"dataType":"string"},"subject8":{"dataType":"string"},"subject9":{"dataType":"string"},"subject10":{"dataType":"string"},"relevantContent":{"dataType":"string"},"a1":{"dataType":"string"},"a2":{"dataType":"string"},"a3":{"dataType":"string"},"a4":{"dataType":"string"},"a5":{"dataType":"string"},"a6":{"dataType":"string"},"a7":{"dataType":"string"},"a8":{"dataType":"string"},"a9":{"dataType":"string"},"a10":{"dataType":"string"},"a11":{"dataType":"string"},"a12":{"dataType":"string"},"a13":{"dataType":"string"},"conclusion":{"dataType":"string","required":true},"approved":{"dataType":"boolean","required":true},"archivesExclusion":{"dataType":"boolean","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_NotebookEntity.-or-idcad-or-idvol-or-idpep-or-studentName-or-studentRegistration-or-studentPrisonUnit-or-evaluatorName-or-evaluatorEmail-or-notebookDirectory_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_NotebookEntity.Exclude_keyofNotebookEntity.-or-idcad-or-idvol-or-idpep-or-studentName-or-studentRegistration-or-studentPrisonUnit-or-evaluatorName-or-evaluatorEmail-or-notebookDirectory__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateNotebookEntity": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_NotebookEntity.-or-idcad-or-idvol-or-idpep-or-studentName-or-studentRegistration-or-studentPrisonUnit-or-evaluatorName-or-evaluatorEmail-or-notebookDirectory_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_PepClassEntity.Exclude_keyofPepClassEntity.place__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double","required":true},"notebookDirectory":{"dataType":"string"},"placeId":{"dataType":"double","required":true},"groupName":{"dataType":"string"},"report":{"dataType":"boolean"},"receivedDay":{"dataType":"datetime"},"releasedDay":{"dataType":"datetime"},"facilitatorName":{"dataType":"string"},"classOneDate":{"dataType":"datetime"},"classTenDate":{"dataType":"datetime"},"numEnrolled":{"dataType":"double"},"numEnrolledGotCertificate":{"dataType":"double"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_PepClassEntity.place_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_PepClassEntity.Exclude_keyofPepClassEntity.place__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PepClassWithPlace": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Omit_PepClassEntity.place_"},{"dataType":"nestedObjectLiteral","nestedProperties":{"fullName":{"dataType":"string","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaginationResult_PepClassWithPlace-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"totalCount":{"dataType":"double","required":true},"pageInfo":{"dataType":"nestedObjectLiteral","nestedProperties":{"hasPreviousPage":{"dataType":"boolean","required":true},"hasNextPage":{"dataType":"boolean","required":true},"page":{"dataType":"double","required":true}},"required":true},"nodes":{"dataType":"array","array":{"dataType":"refAlias","ref":"PepClassWithPlace"},"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PepClassEntity": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"notebookDirectory":{"dataType":"string"},"numEnrolledGotCertificate":{"dataType":"double"},"numEnrolled":{"dataType":"double"},"classTenDate":{"dataType":"datetime"},"classOneDate":{"dataType":"datetime"},"facilitatorName":{"dataType":"string"},"releasedDay":{"dataType":"datetime"},"receivedDay":{"dataType":"datetime"},"report":{"dataType":"boolean"},"groupName":{"dataType":"string"},"place":{"dataType":"string"},"placeId":{"dataType":"double","required":true},"id":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PepClassError": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"union","subSchemas":[{"ref":"ErrorName"},{"dataType":"enum","enums":["UNSPECIFIED_ERROR"]}],"required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
            "details": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_PepClassEntity.Exclude_keyofPepClassEntity.id-or-placeId__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"place":{"dataType":"string"},"notebookDirectory":{"dataType":"string"},"groupName":{"dataType":"string"},"report":{"dataType":"boolean"},"receivedDay":{"dataType":"datetime"},"releasedDay":{"dataType":"datetime"},"facilitatorName":{"dataType":"string"},"classOneDate":{"dataType":"datetime"},"classTenDate":{"dataType":"datetime"},"numEnrolled":{"dataType":"double"},"numEnrolledGotCertificate":{"dataType":"double"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_PepClassEntity.id-or-placeId_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_PepClassEntity.Exclude_keyofPepClassEntity.id-or-placeId__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdatePepClassEntity": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_PepClassEntity.id-or-placeId_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "VolunteerEntity": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"must be a valid email","value":"^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"}}},
            "name": {"dataType":"string","required":true},
            "pep": {"dataType":"double"},
            "birthDate": {"dataType":"datetime","required":true},
            "phoneNumber": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "state": {"dataType":"string","required":true},
            "city": {"dataType":"string","required":true},
            "isDisability": {"dataType":"string","required":true},
            "disability": {"dataType":"string"},
            "howFoundPep": {"dataType":"string","required":true},
            "knowledgePep": {"dataType":"string","required":true},
            "schooling": {"dataType":"string","required":true},
            "bachelor": {"dataType":"string"},
            "studiesKnowledge": {"dataType":"string","required":true},
            "courseOne": {"dataType":"string"},
            "courseTwo": {"dataType":"string"},
            "lifeExperience": {"dataType":"string","required":true},
            "desires": {"dataType":"string","required":true},
            "opportunities": {"dataType":"string","required":true},
            "rolesPep": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "interestFutureRoles": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "needDeclaration": {"dataType":"boolean","required":true},
            "idvol": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "notebookPermission": {"dataType":"boolean"},
            "bookclubPermission": {"dataType":"boolean"},
            "certificate": {"dataType":"boolean"},
            "authorization": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_VolunteerAuthDataEntity.password-or-email_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"password":{"dataType":"string","required":true},"email":{"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"must be a valid email","value":"^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"}}}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_VolunteerWithAuthEntity.Exclude_keyofVolunteerWithAuthEntity.idvol-or-createdAt-or-isDisability-or-opportunities-or-notebookPermission-or-bookclubPermission-or-authorization-or-certificate-or-courseOne-or-courseTwo__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"password":{"dataType":"string","required":true},"email":{"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"must be a valid email","value":"^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"}}},"name":{"dataType":"string","required":true},"pep":{"dataType":"double"},"birthDate":{"dataType":"datetime","required":true},"phoneNumber":{"dataType":"string","required":true},"country":{"dataType":"string","required":true},"state":{"dataType":"string","required":true},"city":{"dataType":"string","required":true},"disability":{"dataType":"string"},"howFoundPep":{"dataType":"string","required":true},"knowledgePep":{"dataType":"string","required":true},"schooling":{"dataType":"string","required":true},"bachelor":{"dataType":"string"},"studiesKnowledge":{"dataType":"string","required":true},"lifeExperience":{"dataType":"string","required":true},"desires":{"dataType":"string","required":true},"rolesPep":{"dataType":"array","array":{"dataType":"string"},"required":true},"interestFutureRoles":{"dataType":"array","array":{"dataType":"string"},"required":true},"needDeclaration":{"dataType":"boolean","required":true},"authorPermission":{"dataType":"string"},"readPermission":{"dataType":"boolean"},"bookPermission":{"dataType":"boolean"},"certificationPermission":{"dataType":"boolean"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_VolunteerWithAuthEntity.idvol-or-createdAt-or-isDisability-or-opportunities-or-notebookPermission-or-bookclubPermission-or-authorization-or-certificate-or-courseOne-or-courseTwo_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_VolunteerWithAuthEntity.Exclude_keyofVolunteerWithAuthEntity.idvol-or-createdAt-or-isDisability-or-opportunities-or-notebookPermission-or-bookclubPermission-or-authorization-or-certificate-or-courseOne-or-courseTwo__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateVolunteerEntity": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_VolunteerWithAuthEntity.idvol-or-createdAt-or-isDisability-or-opportunities-or-notebookPermission-or-bookclubPermission-or-authorization-or-certificate-or-courseOne-or-courseTwo_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SendEmailError": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"union","subSchemas":[{"ref":"ErrorName"},{"dataType":"enum","enums":["UNSPECIFIED_ERROR"]}],"required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
            "details": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SupportEmailSendData": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"subject":{"dataType":"string","required":true},"email":{"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"must be a valid email","value":"^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"}}},"name":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_VolunteerAuthDataEntity.email_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"email":{"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"must be a valid email","value":"^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"}}}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaginationResult_VolunteerEntity-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"totalCount":{"dataType":"double","required":true},"pageInfo":{"dataType":"nestedObjectLiteral","nestedProperties":{"hasPreviousPage":{"dataType":"boolean","required":true},"hasNextPage":{"dataType":"boolean","required":true},"page":{"dataType":"double","required":true}},"required":true},"nodes":{"dataType":"array","array":{"dataType":"refObject","ref":"VolunteerEntity"},"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_VolunteerAuthDataEntity.password_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"password":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Omit_VolunteerEntity.-or-pep-or-idvol-or-createdAt-or-isDisability-or-opportunities-or-notebookPermission-or-bookclubPermission-or-authorization-or-certificate-or-courseOne-or-courseTwo_-and-Pick_VolunteerAuthDataEntity.password__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"email":{"dataType":"string","validators":{"pattern":{"errorMsg":"must be a valid email","value":"^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"}}},"name":{"dataType":"string"},"birthDate":{"dataType":"datetime"},"phoneNumber":{"dataType":"string"},"country":{"dataType":"string"},"state":{"dataType":"string"},"city":{"dataType":"string"},"disability":{"dataType":"string"},"howFoundPep":{"dataType":"string"},"knowledgePep":{"dataType":"string"},"schooling":{"dataType":"string"},"bachelor":{"dataType":"string"},"studiesKnowledge":{"dataType":"string"},"lifeExperience":{"dataType":"string"},"desires":{"dataType":"string"},"rolesPep":{"dataType":"array","array":{"dataType":"string"}},"interestFutureRoles":{"dataType":"array","array":{"dataType":"string"}},"needDeclaration":{"dataType":"boolean"},"password":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateVolunteerEntity": {
        "dataType": "refAlias",
        "type": {"ref":"Partial_Omit_VolunteerEntity.-or-pep-or-idvol-or-createdAt-or-isDisability-or-opportunities-or-notebookPermission-or-bookclubPermission-or-authorization-or-certificate-or-courseOne-or-courseTwo_-and-Pick_VolunteerAuthDataEntity.password__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_VolunteerHoursEntity.Exclude_keyofVolunteerHoursEntity.idHour-or-createdAt__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"idVol":{"dataType":"double","required":true},"manag":{"dataType":"double","required":true},"comm":{"dataType":"double","required":true},"tec":{"dataType":"double","required":true},"event":{"dataType":"double","required":true},"att":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_VolunteerHoursEntity.idHour-or-createdAt_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_VolunteerHoursEntity.Exclude_keyofVolunteerHoursEntity.idHour-or-createdAt__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PostVolunteerHoursEntity": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_VolunteerHoursEntity.idHour-or-createdAt_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/attendances/download/from/:date',
            authenticateMiddleware([{"jwt":["attendanceModulePermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(AttendanceAPI)),
            ...(fetchMiddlewares<RequestHandler>(AttendanceAPI.prototype.getAttendancesDownloadFromDate)),

            async function AttendanceAPI_getAttendancesDownloadFromDate(request: any, response: any, next: any) {
            const args = {
                    date: {"in":"path","name":"date","required":true,"dataType":"string"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AttendanceAPI>(AttendanceAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getAttendancesDownloadFromDate.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/attendances/from/:date',
            authenticateMiddleware([{"jwt":["attendanceModulePermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(AttendanceAPI)),
            ...(fetchMiddlewares<RequestHandler>(AttendanceAPI.prototype.getAttendancesFromDate)),

            async function AttendanceAPI_getAttendancesFromDate(request: any, response: any, next: any) {
            const args = {
                    date: {"in":"path","name":"date","required":true,"dataType":"string"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AttendanceAPI>(AttendanceAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getAttendancesFromDate.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/attendances/metrics/download',
            authenticateMiddleware([{"jwt":["manageVolunteerModulePermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(AttendanceAPI)),
            ...(fetchMiddlewares<RequestHandler>(AttendanceAPI.prototype.getDownloadVolunteersAttendanceMetrics)),

            async function AttendanceAPI_getDownloadVolunteersAttendanceMetrics(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AttendanceAPI>(AttendanceAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getDownloadVolunteersAttendanceMetrics.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/attendances/metrics',
            authenticateMiddleware([{"jwt":["manageVolunteerModulePermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(AttendanceAPI)),
            ...(fetchMiddlewares<RequestHandler>(AttendanceAPI.prototype.getVolunteersAttendanceMetrics)),

            async function AttendanceAPI_getVolunteersAttendanceMetrics(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AttendanceAPI>(AttendanceAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getVolunteersAttendanceMetrics.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/attendances/volunteer/:idvol',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AttendanceAPI)),
            ...(fetchMiddlewares<RequestHandler>(AttendanceAPI.prototype.getAttencesByIdVol)),

            async function AttendanceAPI_getAttencesByIdVol(request: any, response: any, next: any) {
            const args = {
                    idvol: {"in":"path","name":"idvol","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AttendanceAPI>(AttendanceAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getAttencesByIdVol.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/attendances',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AttendanceAPI)),
            ...(fetchMiddlewares<RequestHandler>(AttendanceAPI.prototype.submitAttendance)),

            async function AttendanceAPI_submitAttendance(request: any, response: any, next: any) {
            const args = {
                    attendance: {"in":"body","name":"attendance","required":true,"ref":"SubmitAttendanceEntity"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AttendanceAPI>(AttendanceAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.submitAttendance.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/book-club-class',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(BookClubClassAPI)),
            ...(fetchMiddlewares<RequestHandler>(BookClubClassAPI.prototype.getVolunteersAttendanceMetrics)),

            async function BookClubClassAPI_getVolunteersAttendanceMetrics(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<BookClubClassAPI>(BookClubClassAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getVolunteersAttendanceMetrics.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/book-club-class/download/:idclass',
            authenticateMiddleware([{"jwt":["bookPermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(BookClubClassAPI)),
            ...(fetchMiddlewares<RequestHandler>(BookClubClassAPI.prototype.downloadClassReport)),

            async function BookClubClassAPI_downloadClassReport(request: any, response: any, next: any) {
            const args = {
                    idclass: {"in":"path","name":"idclass","required":true,"dataType":"double"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<BookClubClassAPI>(BookClubClassAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.downloadClassReport.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/book-club-class/count/:idvol',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(BookClubClassAPI)),
            ...(fetchMiddlewares<RequestHandler>(BookClubClassAPI.prototype.countEvaluatedBookClubClassByIdVol)),

            async function BookClubClassAPI_countEvaluatedBookClubClassByIdVol(request: any, response: any, next: any) {
            const args = {
                    idvol: {"in":"path","name":"idvol","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<BookClubClassAPI>(BookClubClassAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.countEvaluatedBookClubClassByIdVol.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/book-club-class/available/:idvol',
            authenticateMiddleware([{"jwt":["bookPermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(BookClubClassAPI)),
            ...(fetchMiddlewares<RequestHandler>(BookClubClassAPI.prototype.getAvailableClasses)),

            async function BookClubClassAPI_getAvailableClasses(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<BookClubClassAPI>(BookClubClassAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getAvailableClasses.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/book-club-class/reserved/:idvol',
            authenticateMiddleware([{"jwt":["bookPermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(BookClubClassAPI)),
            ...(fetchMiddlewares<RequestHandler>(BookClubClassAPI.prototype.getReservedClasses)),

            async function BookClubClassAPI_getReservedClasses(request: any, response: any, next: any) {
            const args = {
                    idvol: {"in":"path","name":"idvol","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<BookClubClassAPI>(BookClubClassAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getReservedClasses.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/book-club-class/reservation',
            authenticateMiddleware([{"jwt":["bookPermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(BookClubClassAPI)),
            ...(fetchMiddlewares<RequestHandler>(BookClubClassAPI.prototype.reserveClassForVolunteer)),

            async function BookClubClassAPI_reserveClassForVolunteer(request: any, response: any, next: any) {
            const args = {
                    reserveData: {"in":"body","name":"reserveData","required":true,"ref":"ReserveClassDataEntity"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<BookClubClassAPI>(BookClubClassAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.reserveClassForVolunteer.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/book-club-class/revert-reservation/:classId',
            authenticateMiddleware([{"jwt":["bookPermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(BookClubClassAPI)),
            ...(fetchMiddlewares<RequestHandler>(BookClubClassAPI.prototype.revertReserveClassForVolunteer)),

            async function BookClubClassAPI_revertReserveClassForVolunteer(request: any, response: any, next: any) {
            const args = {
                    classId: {"in":"path","name":"classId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<BookClubClassAPI>(BookClubClassAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.revertReserveClassForVolunteer.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/book-club-class/from-id/:classId',
            authenticateMiddleware([{"jwt":["essayModulePermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(BookClubClassAPI)),
            ...(fetchMiddlewares<RequestHandler>(BookClubClassAPI.prototype.getClassesFromId)),

            async function BookClubClassAPI_getClassesFromId(request: any, response: any, next: any) {
            const args = {
                    classId: {"in":"path","name":"classId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<BookClubClassAPI>(BookClubClassAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getClassesFromId.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/book-club-class/:classId',
            authenticateMiddleware([{"jwt":["essayModulePermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(BookClubClassAPI)),
            ...(fetchMiddlewares<RequestHandler>(BookClubClassAPI.prototype.updateClass)),

            async function BookClubClassAPI_updateClass(request: any, response: any, next: any) {
            const args = {
                    classId: {"in":"path","name":"classId","required":true,"dataType":"double"},
                    bookClubClass: {"in":"body","name":"bookClubClass","required":true,"ref":"UpdateBCClassEntity"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<BookClubClassAPI>(BookClubClassAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.updateClass.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/book-club-class/:classId',
            authenticateMiddleware([{"jwt":["bookPermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(BookClubClassAPI)),
            ...(fetchMiddlewares<RequestHandler>(BookClubClassAPI.prototype.updateConcluded)),

            async function BookClubClassAPI_updateConcluded(request: any, response: any, next: any) {
            const args = {
                    classId: {"in":"path","name":"classId","required":true,"dataType":"double"},
                    evaluationDate: {"in":"body","name":"evaluationDate","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"endEvaluationDate":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<BookClubClassAPI>(BookClubClassAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.updateConcluded.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/book-evaluations',
            authenticateMiddleware([{"jwt":["bookPermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(BookEvaluationAPI)),
            ...(fetchMiddlewares<RequestHandler>(BookEvaluationAPI.prototype.getVBookEvaluationList)),

            async function BookEvaluationAPI_getVBookEvaluationList(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<BookEvaluationAPI>(BookEvaluationAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getVBookEvaluationList.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/book-evaluations/download',
            authenticateMiddleware([{"jwt":["bookPermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(BookEvaluationAPI)),
            ...(fetchMiddlewares<RequestHandler>(BookEvaluationAPI.prototype.getVBookEvaluationListDownload)),

            async function BookEvaluationAPI_getVBookEvaluationListDownload(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<BookEvaluationAPI>(BookEvaluationAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getVBookEvaluationListDownload.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/book-evaluations',
            authenticateMiddleware([{"jwt":["bookPermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(BookEvaluationAPI)),
            ...(fetchMiddlewares<RequestHandler>(BookEvaluationAPI.prototype.createBookEvaluations)),

            async function BookEvaluationAPI_createBookEvaluations(request: any, response: any, next: any) {
            const args = {
                    bookEvaluations: {"in":"body","name":"bookEvaluations","required":true,"dataType":"array","array":{"dataType":"refAlias","ref":"CreateBookEvaluationEntity"}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<BookEvaluationAPI>(BookEvaluationAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.createBookEvaluations.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/book-evaluations/:evaluationId',
            authenticateMiddleware([{"jwt":["essayModulePermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(BookEvaluationAPI)),
            ...(fetchMiddlewares<RequestHandler>(BookEvaluationAPI.prototype.updateBookEvaluation)),

            async function BookEvaluationAPI_updateBookEvaluation(request: any, response: any, next: any) {
            const args = {
                    evaluationId: {"in":"path","name":"evaluationId","required":true,"dataType":"double"},
                    evaluation: {"in":"body","name":"evaluation","required":true,"ref":"UpdateBookEvaluationEntity"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<BookEvaluationAPI>(BookEvaluationAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.updateBookEvaluation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/book-evaluations/:evaluationId',
            authenticateMiddleware([{"jwt":["bookPermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(BookEvaluationAPI)),
            ...(fetchMiddlewares<RequestHandler>(BookEvaluationAPI.prototype.getBookEvaluationById)),

            async function BookEvaluationAPI_getBookEvaluationById(request: any, response: any, next: any) {
            const args = {
                    evaluationId: {"in":"path","name":"evaluationId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<BookEvaluationAPI>(BookEvaluationAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getBookEvaluationById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/book-evaluations/by-class/:classId',
            authenticateMiddleware([{"jwt":["bookPermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(BookEvaluationAPI)),
            ...(fetchMiddlewares<RequestHandler>(BookEvaluationAPI.prototype.getBookEvaluationByClassId)),

            async function BookEvaluationAPI_getBookEvaluationByClassId(request: any, response: any, next: any) {
            const args = {
                    classId: {"in":"path","name":"classId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<BookEvaluationAPI>(BookEvaluationAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getBookEvaluationByClassId.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/book-evaluations/:evaluationId',
            authenticateMiddleware([{"jwt":["bookPermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(BookEvaluationAPI)),
            ...(fetchMiddlewares<RequestHandler>(BookEvaluationAPI.prototype.deleteBookEvaluation)),

            async function BookEvaluationAPI_deleteBookEvaluation(request: any, response: any, next: any) {
            const args = {
                    evaluationId: {"in":"path","name":"evaluationId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<BookEvaluationAPI>(BookEvaluationAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.deleteBookEvaluation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/book-evaluations/relevant/phrases/:date',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(BookEvaluationAPI)),
            ...(fetchMiddlewares<RequestHandler>(BookEvaluationAPI.prototype.getRelevantPhrases)),

            async function BookEvaluationAPI_getRelevantPhrases(request: any, response: any, next: any) {
            const args = {
                    date: {"in":"path","name":"date","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<BookEvaluationAPI>(BookEvaluationAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getRelevantPhrases.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/notebooks/evaluation-list',
            authenticateMiddleware([{"jwt":["readPermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(NotebookAPI)),
            ...(fetchMiddlewares<RequestHandler>(NotebookAPI.prototype.getNotebooksEvaluation)),

            async function NotebookAPI_getNotebooksEvaluation(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<NotebookAPI>(NotebookAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getNotebooksEvaluation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/notebooks/evaluation-list/download',
            authenticateMiddleware([{"jwt":["readPermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(NotebookAPI)),
            ...(fetchMiddlewares<RequestHandler>(NotebookAPI.prototype.getNotebooksEvaluationDownload)),

            async function NotebookAPI_getNotebooksEvaluationDownload(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<NotebookAPI>(NotebookAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getNotebooksEvaluationDownload.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/notebooks/count/:idvol',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(NotebookAPI)),
            ...(fetchMiddlewares<RequestHandler>(NotebookAPI.prototype.countEvaluatedNotebooksByIdVol)),

            async function NotebookAPI_countEvaluatedNotebooksByIdVol(request: any, response: any, next: any) {
            const args = {
                    idvol: {"in":"path","name":"idvol","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<NotebookAPI>(NotebookAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.countEvaluatedNotebooksByIdVol.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/notebooks/download/:notebookId',
            authenticateMiddleware([{"jwt":["readPermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(NotebookAPI)),
            ...(fetchMiddlewares<RequestHandler>(NotebookAPI.prototype.downloadNotebookFromId)),

            async function NotebookAPI_downloadNotebookFromId(request: any, response: any, next: any) {
            const args = {
                    notebookId: {"in":"path","name":"notebookId","required":true,"dataType":"double"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<NotebookAPI>(NotebookAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.downloadNotebookFromId.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/notebooks/available/:idvol',
            authenticateMiddleware([{"jwt":["readPermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(NotebookAPI)),
            ...(fetchMiddlewares<RequestHandler>(NotebookAPI.prototype.getAvailableNotebooksForEvalForIdVol)),

            async function NotebookAPI_getAvailableNotebooksForEvalForIdVol(request: any, response: any, next: any) {
            const args = {
                    idvol: {"in":"path","name":"idvol","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<NotebookAPI>(NotebookAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getAvailableNotebooksForEvalForIdVol.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/notebooks/evaluation/:notebookId',
            authenticateMiddleware([{"jwt":["readPermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(NotebookAPI)),
            ...(fetchMiddlewares<RequestHandler>(NotebookAPI.prototype.saveNotebookEvaluation)),

            async function NotebookAPI_saveNotebookEvaluation(request: any, response: any, next: any) {
            const args = {
                    notebookId: {"in":"path","name":"notebookId","required":true,"dataType":"double"},
                    notebookData: {"in":"body","name":"notebookData","required":true,"ref":"EvaluateNotebookEntity"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<NotebookAPI>(NotebookAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.saveNotebookEvaluation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/notebooks/reservation',
            authenticateMiddleware([{"jwt":["readPermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(NotebookAPI)),
            ...(fetchMiddlewares<RequestHandler>(NotebookAPI.prototype.reserveNotebookForVolunteer)),

            async function NotebookAPI_reserveNotebookForVolunteer(request: any, response: any, next: any) {
            const args = {
                    reserveData: {"in":"body","name":"reserveData","required":true,"ref":"ReserveNotebookDataEntity"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<NotebookAPI>(NotebookAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.reserveNotebookForVolunteer.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/notebooks/revert-reservation/:notebookId',
            authenticateMiddleware([{"jwt":["readPermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(NotebookAPI)),
            ...(fetchMiddlewares<RequestHandler>(NotebookAPI.prototype.revertReserveNotebookForVolunteer)),

            async function NotebookAPI_revertReserveNotebookForVolunteer(request: any, response: any, next: any) {
            const args = {
                    notebookId: {"in":"path","name":"notebookId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<NotebookAPI>(NotebookAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.revertReserveNotebookForVolunteer.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/notebooks/:notebookId',
            authenticateMiddleware([{"jwt":["readPermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(NotebookAPI)),
            ...(fetchMiddlewares<RequestHandler>(NotebookAPI.prototype.updateNotebook)),

            async function NotebookAPI_updateNotebook(request: any, response: any, next: any) {
            const args = {
                    notebookId: {"in":"path","name":"notebookId","required":true,"dataType":"double"},
                    notebook: {"in":"body","name":"notebook","required":true,"ref":"UpdateNotebookEntity"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<NotebookAPI>(NotebookAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.updateNotebook.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/notebooks/:notebookId',
            authenticateMiddleware([{"jwt":["notebookModulePermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(NotebookAPI)),
            ...(fetchMiddlewares<RequestHandler>(NotebookAPI.prototype.getNotbookbyIdcad)),

            async function NotebookAPI_getNotbookbyIdcad(request: any, response: any, next: any) {
            const args = {
                    notebookId: {"in":"path","name":"notebookId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<NotebookAPI>(NotebookAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getNotbookbyIdcad.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/pep-class',
            authenticateMiddleware([{"jwt":["notebookModulePermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(PepAPI)),
            ...(fetchMiddlewares<RequestHandler>(PepAPI.prototype.getClasses)),

            async function PepAPI_getClasses(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<PepAPI>(PepAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getClasses.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/pep-class/from-id/:classId',
            authenticateMiddleware([{"jwt":["notebookModulePermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(PepAPI)),
            ...(fetchMiddlewares<RequestHandler>(PepAPI.prototype.getClassesFromId)),

            async function PepAPI_getClassesFromId(request: any, response: any, next: any) {
            const args = {
                    classId: {"in":"path","name":"classId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<PepAPI>(PepAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getClassesFromId.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/pep-class/:classId',
            authenticateMiddleware([{"jwt":["notebookModulePermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(PepAPI)),
            ...(fetchMiddlewares<RequestHandler>(PepAPI.prototype.updateClass)),

            async function PepAPI_updateClass(request: any, response: any, next: any) {
            const args = {
                    classId: {"in":"path","name":"classId","required":true,"dataType":"double"},
                    pepClass: {"in":"body","name":"pepClass","required":true,"ref":"UpdatePepClassEntity"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<PepAPI>(PepAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.updateClass.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.head('/volunteers/:email',
            ...(fetchMiddlewares<RequestHandler>(UnsecuredVolunteerAPI)),
            ...(fetchMiddlewares<RequestHandler>(UnsecuredVolunteerAPI.prototype.checkExistingEmail)),

            async function UnsecuredVolunteerAPI_checkExistingEmail(request: any, response: any, next: any) {
            const args = {
                    email: {"in":"path","name":"email","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UnsecuredVolunteerAPI>(UnsecuredVolunteerAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.checkExistingEmail.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/volunteers/password',
            ...(fetchMiddlewares<RequestHandler>(UnsecuredVolunteerAPI)),
            ...(fetchMiddlewares<RequestHandler>(UnsecuredVolunteerAPI.prototype.createOrUpdatePasswordForHashEmail)),

            async function UnsecuredVolunteerAPI_createOrUpdatePasswordForHashEmail(request: any, response: any, next: any) {
            const args = {
                    createOrUpatePassData: {"in":"body","name":"createOrUpatePassData","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"hashEmail":{"dataType":"string","required":true},"password":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UnsecuredVolunteerAPI>(UnsecuredVolunteerAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.createOrUpdatePasswordForHashEmail.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/volunteers/login',
            ...(fetchMiddlewares<RequestHandler>(UnsecuredVolunteerAPI)),
            ...(fetchMiddlewares<RequestHandler>(UnsecuredVolunteerAPI.prototype.login)),

            async function UnsecuredVolunteerAPI_login(request: any, response: any, next: any) {
            const args = {
                    loginData: {"in":"body","name":"loginData","required":true,"ref":"Pick_VolunteerAuthDataEntity.password-or-email_"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UnsecuredVolunteerAPI>(UnsecuredVolunteerAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.login.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/volunteers',
            ...(fetchMiddlewares<RequestHandler>(UnsecuredVolunteerAPI)),
            ...(fetchMiddlewares<RequestHandler>(UnsecuredVolunteerAPI.prototype.createVolunteer)),

            async function UnsecuredVolunteerAPI_createVolunteer(request: any, response: any, next: any) {
            const args = {
                    volunteer: {"in":"body","name":"volunteer","required":true,"ref":"CreateVolunteerEntity"},
                    idpep: {"in":"query","name":"idpep","dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UnsecuredVolunteerAPI>(UnsecuredVolunteerAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.createVolunteer.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/volunteers/help-email',
            ...(fetchMiddlewares<RequestHandler>(UnsecuredVolunteerAPI)),
            ...(fetchMiddlewares<RequestHandler>(UnsecuredVolunteerAPI.prototype.sendHelpEmail)),

            async function UnsecuredVolunteerAPI_sendHelpEmail(request: any, response: any, next: any) {
            const args = {
                    helpEmailData: {"in":"body","name":"helpEmailData","required":true,"ref":"SupportEmailSendData"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UnsecuredVolunteerAPI>(UnsecuredVolunteerAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.sendHelpEmail.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/volunteers/contact-email',
            ...(fetchMiddlewares<RequestHandler>(UnsecuredVolunteerAPI)),
            ...(fetchMiddlewares<RequestHandler>(UnsecuredVolunteerAPI.prototype.sendContactEmail)),

            async function UnsecuredVolunteerAPI_sendContactEmail(request: any, response: any, next: any) {
            const args = {
                    contactEmailData: {"in":"body","name":"contactEmailData","required":true,"ref":"SupportEmailSendData"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UnsecuredVolunteerAPI>(UnsecuredVolunteerAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.sendContactEmail.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/volunteers/password-email',
            ...(fetchMiddlewares<RequestHandler>(UnsecuredVolunteerAPI)),
            ...(fetchMiddlewares<RequestHandler>(UnsecuredVolunteerAPI.prototype.sendCreatePasswordEmail)),

            async function UnsecuredVolunteerAPI_sendCreatePasswordEmail(request: any, response: any, next: any) {
            const args = {
                    emailWrapper: {"in":"body","name":"emailWrapper","required":true,"ref":"Pick_VolunteerAuthDataEntity.email_"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UnsecuredVolunteerAPI>(UnsecuredVolunteerAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.sendCreatePasswordEmail.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/volunteers/download/from/:date',
            authenticateMiddleware([{"jwt":["determineVolunteerModulePermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(VolunteerAPI)),
            ...(fetchMiddlewares<RequestHandler>(VolunteerAPI.prototype.getDownloadVolunteersFromDate)),

            async function VolunteerAPI_getDownloadVolunteersFromDate(request: any, response: any, next: any) {
            const args = {
                    date: {"in":"path","name":"date","required":true,"dataType":"string"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<VolunteerAPI>(VolunteerAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getDownloadVolunteersFromDate.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/volunteers/from/:date',
            authenticateMiddleware([{"jwt":["determineVolunteerModulePermission"]}]),
            ...(fetchMiddlewares<RequestHandler>(VolunteerAPI)),
            ...(fetchMiddlewares<RequestHandler>(VolunteerAPI.prototype.getVolunteersFromDate)),

            async function VolunteerAPI_getVolunteersFromDate(request: any, response: any, next: any) {
            const args = {
                    date: {"in":"path","name":"date","required":true,"dataType":"string"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<VolunteerAPI>(VolunteerAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getVolunteersFromDate.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/volunteers/:email/password',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(VolunteerAPI)),
            ...(fetchMiddlewares<RequestHandler>(VolunteerAPI.prototype.createOrUpdatePassword)),

            async function VolunteerAPI_createOrUpdatePassword(request: any, response: any, next: any) {
            const args = {
                    email: {"in":"path","name":"email","required":true,"dataType":"string"},
                    passwordWrapper: {"in":"body","name":"passwordWrapper","required":true,"ref":"Pick_VolunteerAuthDataEntity.password_"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<VolunteerAPI>(VolunteerAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.createOrUpdatePassword.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/volunteers/:email',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(VolunteerAPI)),
            ...(fetchMiddlewares<RequestHandler>(VolunteerAPI.prototype.updateVolunteer)),

            async function VolunteerAPI_updateVolunteer(request: any, response: any, next: any) {
            const args = {
                    email: {"in":"path","name":"email","required":true,"dataType":"string"},
                    volunteer: {"in":"body","name":"volunteer","required":true,"ref":"UpdateVolunteerEntity"},
                    turmaHeader: {"in":"header","name":"turma","dataType":"string"},
                    _request: {"in":"request","name":"_request","dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<VolunteerAPI>(VolunteerAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.updateVolunteer.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/volunteers/:email',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(VolunteerAPI)),
            ...(fetchMiddlewares<RequestHandler>(VolunteerAPI.prototype.getVolunteerByEmail)),

            async function VolunteerAPI_getVolunteerByEmail(request: any, response: any, next: any) {
            const args = {
                    email: {"in":"path","name":"email","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<VolunteerAPI>(VolunteerAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getVolunteerByEmail.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/volunteers/:email',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(VolunteerAPI)),
            ...(fetchMiddlewares<RequestHandler>(VolunteerAPI.prototype.deleteVolunteer)),

            async function VolunteerAPI_deleteVolunteer(request: any, response: any, next: any) {
            const args = {
                    email: {"in":"path","name":"email","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<VolunteerAPI>(VolunteerAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.deleteVolunteer.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/volunteers/hours',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(VolunteerAPI)),
            ...(fetchMiddlewares<RequestHandler>(VolunteerAPI.prototype.postVolunteerHours)),

            async function VolunteerAPI_postVolunteerHours(request: any, response: any, next: any) {
            const args = {
                    hoursVolunteer: {"in":"body","name":"hoursVolunteer","required":true,"ref":"PostVolunteerHoursEntity"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<VolunteerAPI>(VolunteerAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.postVolunteerHours.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.head('/volunteers/hours/:idVol',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(VolunteerAPI)),
            ...(fetchMiddlewares<RequestHandler>(VolunteerAPI.prototype.checkVolunteerHoursStatus)),

            async function VolunteerAPI_checkVolunteerHoursStatus(request: any, response: any, next: any) {
            const args = {
                    idVol: {"in":"path","name":"idVol","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<VolunteerAPI>(VolunteerAPI);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.checkVolunteerHoursStatus.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, _response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await promiseAny.call(Promise, secMethodOrPromises);
                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            response.status(statusCode || 200)
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'queries':
                    return validationService.ValidateParam(args[key], request.query, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
