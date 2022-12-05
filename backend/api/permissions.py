from rest_framework import permissions


class BaseModelPermission(permissions.DjangoModelPermissions):
    view_permissions = ['%(app_label)s.view_%(model_name)s']

    perms_map = {
        'GET': view_permissions,
        'OPTIONS': view_permissions,
        'HEAD': view_permissions,
        'POST': permissions.DjangoModelPermissions.perms_map['POST'],
        'PUT': permissions.DjangoModelPermissions.perms_map['PUT'],
        'PATCH': permissions.DjangoModelPermissions.perms_map['PATCH'],
        'DELETE': permissions.DjangoModelPermissions.perms_map['DELETE'],
    }


class IsAdmin(permissions.IsAdminUser):
    pass


class IsAffiliateItself(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user:
            if request.user.is_superuser:
                return True
            else:
                return obj.email == request.user.email
        else:
            return False


class IsContributorItself(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user:
            if request.user.is_superuser:
                return True
            else:
                return obj.dni.email == request.user.email
        else:
            return False


class IsItsBeneficiary(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user:
            if request.user.is_superuser:
                return True
            else:
                return obj.cotizante.dni.email == request.user.email
        else:
            return False