import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { User } from '../../../user/models/user.model';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from '../../../user/services/user.service';
import { AdminCreateUserDialogComponent } from './admin-create-user/admin-create-user-dialog.component.html.component';
import { Company } from '../../../user/models/company.model';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthStore } from '../../../store/auth';
import { AdminJobsDetailsDialogComponent } from './admin-jobs-details/admin-jobs-details-dialog.component';
import { CompanyService } from '../../../user/services/company.service';
import * as Moment from 'moment';

interface Filter {
	type: string;
	value?: any;
}

@Component({
	selector: 'app-admin-users',
	templateUrl: './admin-users.component.html',
	styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit, AfterViewInit {
	displayedColumns: string[] = [
		'select',
		'firstname',
		'lastname',
		'email',
		'role',
		'tel',
		'emailVerified',
		'phoneVerified',
		'status',
		'state',
		'creation-date',
		'last-connexion',
		'Id',
		'IdCompany'
	];
	dataSource = new MatTableDataSource<User>();
	companiesDataSource: Company[] = [];
	selection = new SelectionModel<User>(true, []);
	selectedUser: User;
	currentFilter: string;

	roleFilter: Filter = { type: 'role' };
	statusFilter: Filter = { type: 'status' };
	stateFilter: Filter = { type: 'state' };
	creationDateFilter: Filter = { type: 'creationDate' };
	lastConnexionFilter: Filter = { type: 'lastConnexion' };
	globalFilter: Filter = { type: 'global' };

	numberOfUsers = 0;
	numberOfPublishedUsers = 0;
	numberOfUnpublishedUsers = 0;
	numberOfArchivedUsers = 0;

	@ViewChild('inputCreateDate', { read: MatInput, static: true }) inputCreateDate: MatInput;
	@ViewChild('inputLastConnexionDate', { read: MatInput, static: true }) inputLastConnexionDate: MatInput;
	@ViewChild(MatButton) btnRef: MatButton;

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private userService: UserService,
		private cdr: ChangeDetectorRef,
		public dialog: MatDialog,
		private readonly toastrService: ToastrService,
		private readonly translateService: TranslateService,
		private readonly router: Router,
		private authStore: AuthStore,
		private companyService: CompanyService
	) {}

	ngOnInit() {
		this.userService.getUsers().subscribe(users => {
			this.dataSource = new MatTableDataSource<User>(users);
			this.dataSource.paginator = this.paginator;
			this.dataSource.filterPredicate = this.regExprFilter();
			this.countUsers(this.dataSource);
			this.cdr.detectChanges();
		});
	}

	ngAfterViewInit(): void {
		this.btnRef.focus();
	}

	moment(date: any) {
		if (date) {
			return Moment(date).format('DD-MM-YYYY');
		}
	}

	refrechDataSource() {
		this.userService.getUsers().subscribe(users => {
			this.dataSource = new MatTableDataSource<User>(users);
			this.dataSource.paginator = this.paginator;
			this.dataSource.filterPredicate = this.regExprFilter();
			this.countUsers(this.dataSource);
			this.cdr.detectChanges();
		});
	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	masterToggle() {
		this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
	}

	checkboxLabel(row?: User): string {
		if (!row) {
			return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
	}

	openCreateUserDialog(event: Event): void {
		event.preventDefault();
		const dialogRef = this.dialog.open(AdminCreateUserDialogComponent, {});

		dialogRef.afterClosed().subscribe(result => {
			this.refrechDataSource();
		});
	}

	openUpdateUserDialog(event: Event): void {
		event.preventDefault();
		const dialogRef = this.dialog.open(AdminCreateUserDialogComponent, {
			data: this.selectedUser
		});

		dialogRef.afterClosed().subscribe(result => {
			this.selectedUser = null;
			this.refrechDataSource();
		});
	}

	openJobsDetailsDialog(event: Event): void {
		event.preventDefault();
		this.companyService.findCompanyByEmail(this.selectedUser.email).subscribe(
			res => {
				const dialogRef = this.dialog.open(AdminJobsDetailsDialogComponent, {
					width: '900px',
					data: { company: res, providerEmail: this.selectedUser.email }
				});

				dialogRef.afterClosed().subscribe(result => {
					this.selectedUser = null;
					this.refrechDataSource();
				});
			},
			error => {
				const dialogRef = this.dialog.open(AdminJobsDetailsDialogComponent, {
					width: '900px',
					data: null
				});

				dialogRef.afterClosed().subscribe(result => {
					this.selectedUser = null;
					this.refrechDataSource();
				});
			}
		);
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue;
	}

	onSelectRow(event: Event, row: User) {
		this.selection.clear();
		this.selection.toggle(row);
		if (this.selectedUser === row) {
			this.selection.toggle(row);
			this.selectedUser = null;
			return;
		}
		this.selectedUser = row;
	}

	onDuplicateUser(event: Event) {
		event.preventDefault();
		this.refrechDataSource();
	}

	onPublishUser(event: Event) {
		event.preventDefault();
		const userToPulish = { ...this.selectedUser };
		userToPulish.status = 'PUBLISHED';
		this.userService.patchUser(userToPulish.email, this.constructUserTemp(userToPulish)).subscribe(
			res => {
				if (res) {
					const msg = this.translateService.instant('request succeeded');
					this.toastrService.success(msg);
					this.refrechDataSource();
					return;
				}
			},
			err => {
				const msg = this.translateService.instant('telephone non validé');
				this.toastrService.error(msg);
			}
		);
	}

	onUnpublishUser(event: Event) {
		event.preventDefault();
		this.selectedUser.status = 'UNPUBLISHED';
		this.userService
			.patchUser(this.selectedUser.email, this.constructUserTemp(this.selectedUser))
			.subscribe(res => {
				if (res) {
					const msg = this.translateService.instant('request succeeded');
					this.toastrService.success(msg);
					this.refrechDataSource();
					return;
				}
			});
	}

	onArchiveUser(event: Event) {
		event.preventDefault();
		this.selectedUser.status = 'ARCHIVED';
		this.userService
			.patchUser(this.selectedUser.email, this.constructUserTemp(this.selectedUser))
			.subscribe(res => {
				if (res) {
					const msg = this.translateService.instant('request succeeded');
					this.toastrService.success(msg);
					this.refrechDataSource();
					return;
				}
			});
	}

	onDeleteUser(event: Event) {
		event.preventDefault();
		this.userService.deleteUser(this.selectedUser.email).subscribe(res => {
			this.refrechDataSource();
		});
	}

	onChangeSelect(event, filter: string) {
		this.currentFilter = filter;
		if (filter === 'role') {
			this.roleFilter.value = event.value;
		}
		if (filter === 'status') {
			this.statusFilter.value = event.value;
		}
		if (filter === 'state') {
			this.stateFilter.value = event.value;
		}
		if (filter === 'global') {
			event = this.globalFilter;
		}
		if (filter === 'creationDate') {
			this.creationDateFilter.value = this.moment(event.value);
		}
		if (filter === 'lastConnexion') {
			this.lastConnexionFilter.value = this.moment(event.value);
		}
		this.dataSource.filter = event.value;
	}

	onClearFilters(event: Event) {
		event.preventDefault();
		this.inputCreateDate.value = null;
		this.inputLastConnexionDate.value = null;
		this.globalFilter.value = '';
		this.roleFilter.value = null;
		this.stateFilter.value = null;
		this.statusFilter.value = null;
		this.creationDateFilter.value = null;
		this.lastConnexionFilter.value = null;
		this.refrechDataSource();
	}

	onCompanyDetails(event: Event) {
		event.preventDefault();
		this.router.navigate([
			`/administration/${this.authStore.getUser().email}/company-admin/${this.selectedUser.email}/edit/company`
		]);
	}

	constructUserTemp(user: User) {
		return {
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
			emailVerified: user.emailVerified,
			phoneVerified: user.phoneVerified,
			phoneToken: user.phoneToken,
			connectionType: user.connectionType,
			status: user.status,
			state: user.state,
			location: user.location
		};
	}

	countUsers(dataSource: MatTableDataSource<User>) {
		this.numberOfUsers = 0;
		this.numberOfPublishedUsers = 0;
		this.numberOfUnpublishedUsers = 0;
		dataSource.data.forEach(element => {
			this.numberOfUsers++;
			switch (element.status) {
				case 'PUBLISHED':
					this.numberOfPublishedUsers++;
					break;
				case 'UNPUBLISHED':
					this.numberOfUnpublishedUsers++;
					break;
				case 'ARCHIVED':
					this.numberOfArchivedUsers++;
					break;
				default:
					break;
			}
		});
	}

	regExprFilter() {
		return (data: User, filter: any) => {
			if (this.currentFilter === 'role') {
				return (
					(data.role ? data.role === filter : false) &&
					(this.statusFilter.value ? data.status === this.statusFilter.value : true) &&
					(this.stateFilter.value ? data.state === this.stateFilter.value : true) &&
					(this.lastConnexionFilter.value
						? this.moment(data.lastConnexionDate) === this.lastConnexionFilter.value
						: true) &&
					(this.creationDateFilter.value
						? this.moment(data.createdAt) === this.creationDateFilter.value
						: true)
				);
			}
			if (this.currentFilter === 'status') {
				return (
					(data.status ? data.status === filter : false) &&
					(this.roleFilter.value ? data.role === this.roleFilter.value : true) &&
					(this.stateFilter.value ? data.state === this.stateFilter.value : true) &&
					(this.lastConnexionFilter.value
						? this.moment(data.lastConnexionDate) === this.lastConnexionFilter.value
						: true) &&
					(this.creationDateFilter.value
						? this.moment(data.createdAt) === this.creationDateFilter.value
						: true)
				);
			}
			if (this.currentFilter === 'state') {
				return (
					(data.state ? data.state === filter : false) &&
					(this.statusFilter.value ? data.status === this.statusFilter.value : true) &&
					(this.roleFilter.value ? data.role === this.roleFilter.value : true) &&
					(this.lastConnexionFilter.value
						? this.moment(data.lastConnexionDate) === this.lastConnexionFilter.value
						: true) &&
					(this.creationDateFilter.value
						? this.moment(data.createdAt) === this.creationDateFilter.value
						: true)
				);
			}
			if (this.currentFilter === 'global') {
				const dataStr = JSON.stringify(data)
					.trim()
					.toLowerCase();
				return dataStr.indexOf(filter.trim().toLowerCase()) !== -1;
			}
			if (this.currentFilter === 'creationDate') {
				return (
					(data.createdAt ? this.moment(data.createdAt) === this.moment(filter) : false) &&
					(this.statusFilter.value ? data.status === this.statusFilter.value : true) &&
					(this.roleFilter.value ? data.role === this.roleFilter.value : true) &&
					(this.lastConnexionFilter.value
						? this.moment(data.lastConnexionDate) === this.lastConnexionFilter.value
						: true) &&
					(this.stateFilter.value ? data.state === this.stateFilter.value : true)
				);
			}
			if (this.currentFilter === 'lastConnexion') {
				return (
					(data.lastConnexionDate ? this.moment(data.lastConnexionDate) === this.moment(filter) : false) &&
					(this.statusFilter.value ? data.status === this.statusFilter.value : true) &&
					(this.roleFilter.value ? data.role === this.roleFilter.value : true) &&
					(this.creationDateFilter.value
						? this.moment(data.createdAt) === this.creationDateFilter.value
						: true) &&
					(this.stateFilter.value ? data.state === this.stateFilter.value : true)
				);
			}
		};
	}
}
