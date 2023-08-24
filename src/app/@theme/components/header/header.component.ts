import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbIconLibraries, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../../components/auth/services/auth.service';
import { Router } from '@angular/router';
import { NbAuthJWTToken, NbAuthResult, NbAuthService } from '@nebular/auth';

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

  userMenu = [ { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private router:Router,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private authservice:AuthService,
              private authService: NbAuthService,
              private iconLibraries: NbIconLibraries) {
                  this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fa-solid', iconClassPrefix: 'fa' });
                  this.iconLibraries.registerFontPack('regular', { packClass: 'far', iconClassPrefix: 'fa' });
                  this.iconLibraries.registerFontPack('solid', { packClass: 'fas', iconClassPrefix: 'fa' });

  
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
      
        if (token.isValid()) {
          this.user = true; // here we receive a payload from the token and assigns it to our `user` variable 
          console.log("user",token)
        }
        
      });
  }

  auth:boolean
  ngOnInit() {
    this.userService.getUsers()
    .subscribe(( users: any ) => this.user = users.nick);
  this.menuService.onItemClick().subscribe(( event ) => {
    this.onItemSelection(event.item.title);
  })

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


onItemSelection( title ) {
  if ( title === 'Log out' ) {
    // Do something on Log out
    this.logout('email')
  } 
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
  // logout(){
  //   this.authService.logout('email')
  //   this.router.navigate(['/auth/login'])
  // }
  logout(strategy: string): void {
    this.authService.logout(strategy).subscribe((result: NbAuthResult) => {
      console.log("log",result)
         this.router.navigate(['/auth/login']);
    });
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
