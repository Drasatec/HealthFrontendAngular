import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbIconLibraries, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../../components/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    }
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private router:Router,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private authservice:AuthService,
              private iconLibraries: NbIconLibraries) {
                  this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fa-solid', iconClassPrefix: 'fa' });
                  this.iconLibraries.registerFontPack('regular', { packClass: 'far', iconClassPrefix: 'fa' });
                  this.iconLibraries.registerFontPack('solid', { packClass: 'fas', iconClassPrefix: 'fa' });
  }
  auth:boolean
  ngOnInit() {
    // this.currentTheme = this.themeService.currentTheme;

    // this.userService.getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => this.user = users.nick);
    if(this.authservice.currentUser){
      this.auth = true
    }else{
      this.auth=false
    }
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    // this.themeService.onThemeChange()
    //   .pipe(
    //     map(({ name }) => name),
    //     takeUntil(this.destroy$),
    //   )
    //   .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    console.log(themeName)
    this.themeService.changeTheme(themeName);
    if(themeName === 'default'){
      this.currentTheme = 'dark'
    }else {
      this.currentTheme = 'default'
    }
  }
  logout(){
    this.authservice.logOut()
    this.router.navigate(['/auth/login'])
  }
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
