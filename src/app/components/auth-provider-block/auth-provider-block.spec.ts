import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthProviderBlock } from './auth-provider-block';

describe('AuthProviderBlock', () => {
  let component: AuthProviderBlock;
  let fixture: ComponentFixture<AuthProviderBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthProviderBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthProviderBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
