import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    constructor() { }

    // Reusable function to show the uniqueObjArray
    uniqueObjArray(arr: any[], key: string) {
        return [...new Map(arr.map(item =>
            [item[key], item])).values()]
    }

    // Delete null values of object
    deleteNullValues(obj) {
        Object.keys(obj).forEach(key => {
            if (obj[key] === undefined) {
                delete obj[key]
            }
            if (obj[key] === null) {
                obj[key] = ""
            }
        })
        return obj
    }

    deleteNullValuesNotEmpyString(obj) {
        Object.keys(obj).forEach(key => {
            if (obj[key] === undefined || obj[key] === null) {
                delete obj[key]
            }
        })
        return obj
    }
    deleteNullValuesFetchCriteria(obj) {
        Object.keys(obj).forEach(key => {
            if (obj[key] === undefined || obj[key] === null || obj[key] === '') {
                delete obj[key]
            }

        })
        return obj
    }


    /**
      * Change route url without reload.
      * @param  {Router} router.
      * @param  {ActivatedRoute} activateRoute.
      */
    changeRouteParams(router: Router, activateRoute: ActivatedRoute, params): void {
        router.navigate(
            [],
            {
                relativeTo: activateRoute,
                queryParams: params,
            });
    }

    /**
      * Change date formate that come from backend to set to ngDatePicker.
      * @param  {date} string.
      * @returns {object}
      */
    changeDateForMateToSet(date: string): object {
        const dateFormate = date ? date?.split('T')[0].split('-') : null;
        return {
            day: dateFormate ? +dateFormate[2] : null,
            month: dateFormate ? +dateFormate[1] : null,
            year: dateFormate ? +dateFormate[0] : null,
        }
    }
    changeDateForMateBusToSet(date: string): object {
        const dateFormate = date ? date?.split('T')[0].split('-') : null;
        return {
            day: dateFormate ? +dateFormate[0] : null,
            month: dateFormate ? +dateFormate[1] : null,
            year: dateFormate ? +dateFormate[2] : null,
        }
    }

    /**
      * Change date formate that come from backend to set to ngDatePicker.
      * @param  {date} string.
      * @returns {object}
      */
    changeDateForMateToSetNew(date: string): object {
        const dateFormate = date?.split('T')[0].split('-');
        return {
            day: dateFormate ? +dateFormate[0] : null,
            month: dateFormate ? +dateFormate[1] : null,
            year: dateFormate ? +dateFormate[2] : null,
        }
    }

    /**
      * Convert ngDatePicker date to valid date string.
      * @param  {date} obj.
      * @returns {string}
      */
    covertDateToString(date: any): string {
        return date?.year ? `${date?.year}-${date?.month}-${date?.day}` : null
    }

    /**
     * Check if date greater than anther (NgDatePicker)
     * @param  {fromDate} object
     * @param  {toDate} object
     * @returns {Boolean}
   */
    checkIfDateGreaterThanDate(fromDate: any, toDate: any): boolean {
        let from = moment([
            fromDate?.year,
            fromDate?.month - 1,
            fromDate?.day,
        ]);

        let to = moment([
            toDate?.year,
            toDate?.month - 1,
            toDate?.day,
        ])
        return to.diff(from) > 0
    }


    // confirmDialog(data) {
    //     return Swal.fire({
    //         title: data?.title,
    //         icon: data?.icon,
    //         text: data?.text,
    //         showCancelButton: data?.showCancelButton,
    //         confirmButtonColor: data?.confirmButtonColor,
    //         cancelButtonColor: data?.cancelButtonColor,
    //         confirmButtonText: data?.confirmButtonText
    //     })
    // }


    mapArrayForJoin(array) {
        return array.map((item: any) => item?.name)?.join(',')
    }
    getElDOMOffset(el: any) {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    }
    isEmptyObj(object) {
        for (const property in object) {
            return false;
        }

        return true;
    }


    convertDateFormat(date: string, format: string) {

        var dateArr = date.split('.');
        if (dateArr.length != 3)
            dateArr = date.split('/');
        if (dateArr.length != 3)
            dateArr = date.split('-');
        if (dateArr.length != 3)
            return null;

        if ([
            'yyyy.mm.dd',
            'yyyy-mm-dd',
            'yyyy/mm/dd',
        ].includes(format)) {
            switch (format) {
                case 'yyyy.mm.dd':
                    if (dateArr[0].length === 4) return date;

                    return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;
                case 'yyyy-mm-dd':
                    if (dateArr[0].length === 4) return date;

                    return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
                case 'yyyy/mm/dd':
                    if (dateArr[0].length === 4) return date;

                    return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
                default:
                    return null;
            }
        }


        if ([
            'dd.mm.yyyy',
            'dd-mm-yyyy',
            'dd/mm/yyyy',
        ].includes(format)) {
            switch (format) {
                case 'dd.mm.yyyy':
                    if (dateArr[0].length === 2) return date;

                    return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;
                case 'dd-mm-yyyy':
                    if (dateArr[0].length === 2) return date;

                    return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
                case 'dd/mm/yyyy':
                    if (dateArr[0].length === 2) return date;

                    return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
                default:
                    return null;
            }
        }

        return null;

    }
    toFormData<T>(formValue: T) {
        let formData = new FormData();
        for (const key of Object.keys(formValue)) {
            const value = formValue[key];
            formData.append(key, value);
        }

        return formData;
    }

    getLogoFileName(url: string) {

        // Check if url is Valid
        if (!this.isValidHttpUrl(url)) return null;
        const urlObj = new URL(url);

        // Check if Path Name Exists
        const path = urlObj.pathname;
        if (path === '/') return null;

        // Get the File Name
        const pathParts = path.split('/')

        return pathParts[pathParts.length - 1]
    }

    isValidHttpUrl(urlString: string) {
        let url;

        try {
            url = new URL(urlString);
        } catch (_) {
            return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
    }

    getTwentyFourHourTime(amPmString) {
        var d = new Date("10/21/2022 " + amPmString);
        return d.getHours() + ':' + d.getMinutes();
    }

}

@Injectable()
export class CustomDateAdapter {
    fromModel(value: string): NgbDateStruct {

        if (!value)
            return null
        let parts = value.split("-");

        return { day: +parts[0], month: +parts[1], year: +parts[2] }
    }

    toModel(date: NgbDateStruct): string // from internal model -> your mode
    {
        return date ? ('0' + date.day).slice(-2) + "-" + ('0' + date.month).slice(-2) + "-" + date.year : null
    }
}
@Injectable()
export class CustomDateParserFormatter {
    parse(value: string): NgbDateStruct {

        if (!value)
            return null
        let parts = value.split("-");

        return { year: +parts[2], month: +parts[1], day: +parts[0] } as NgbDateStruct

    }
    format(date: NgbDateStruct): string {

        return date ? ('0' + date.day).slice(-2) + "-" + ('0' + date.month).slice(-2) + "-" + ('0' + date.year).slice(1) : null
    }
}
